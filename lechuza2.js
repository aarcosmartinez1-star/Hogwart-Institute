// Lechuza Mensajera - Buzón Mágico con Funciones de Administración y Diálogos
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const owl = document.getElementById('owl');
    const owlMessage = document.getElementById('owlMessage');
    const sendOwlBtn = document.getElementById('sendOwlBtn');
    const messageBoard = document.getElementById('messageBoard');
    
    // Estado de la lechuza
    let isOwlFlying = false;
    let messageCount = 0;
    let isAdminMode = false;
    
    // Contador de clics para activación secreta
    let owlClickCount = 0;
    let clickTimeout = null;
    
    // Contraseña de administrador
    const ADMIN_PASSWORD = "Althea16";
    
    // Mensajes que dirá la lechuza al hacer clic
    const owlMessages = [
        "¡Hoo hoo! ¿Necesitas enviar un mensaje? 🦉",
        "Tu pergamino viajará rápido conmigo ✨",
        "Los secretos están seguros conmigo 🤫",
        "¡La magia está en cada palabra que escribes! 📜",
        "¿Tienes un mensaje especial para alguien? 💌",
        "Las estrellas guían mi vuelo esta noche 🌟",
        "¡Soy la mensajera más rápida de Hogwarts! ⚡",
        "Cada mensaje lleva un poquito de magia 🎩",
        "¿Sabías que puedo leer en la oscuridad? 🌙",
        "¡Tu mensaje llegará antes de que lo esperes! 🚀",
        "Los secretos mejor guardados... los llevo yo 🕵️‍♀️",
        "La tinta mágica nunca se borra ✍️",
        "¡Un mensaje tuyo alegrará el día de alguien! ☀️",
        "Vuelo más rápido que una escoba Nimbus 2000! 🧹",
        "La luna llena es mi compañera de vuelo 🌕"
    ];
    
    // Mensajes especiales según la hora del día
    const timeBasedMessages = {
        morning: ["¡Buenos días! Es un día perfecto para enviar mensajes ☀️", "La mañana trae nuevos mensajes 🌄"],
        afternoon: ["La tarde es ideal para escribir 📝", "El sol nos ilumina el camino 🌤️"],
        evening: ["¡Buenas tardes! Las sombras alargan mi vuelo 🌆", "La magia se intensifica al atardecer ✨"],
        night: ["¡Buenas noches! Las estrellas son mi guía 🌌", "La luna ilumina mi camino nocturno 🌙"]
    };
    
    // Cargar mensajes almacenados
    loadMessages();
    
    // Configurar el evento de envío
    sendOwlBtn.addEventListener('click', sendMessage);
    
    // Permitir enviar con Enter (Ctrl+Enter o Cmd+Enter)
    owlMessage.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Activar modo administrador con combinación de teclas (Ctrl+Alt+M)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.altKey && e.key === 'm') {
            activateAdminMode();
        }
    });
    
    // Activar modo administrador con 5 clics en la lechuza
    owl.addEventListener('click', function(e) {
        if (isOwlFlying) return; // No contar clics durante el vuelo
        
        // Reiniciar contador si pasan más de 2 segundos entre clics
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }
        
        owlClickCount++;
        
        // Efecto visual de clic secreto
        owl.style.transform = 'scale(0.95)';
        setTimeout(() => {
            owl.style.transform = '';
        }, 100);
        
        // Mostrar mensajito de la lechuza (pero no en los clics de activación secreta)
        if (owlClickCount < 5) {
            showOwlMessage(e.clientX, e.clientY);
        }
        
        // Mostrar indicador visual de progreso (solo visible para ti)
        if (owlClickCount > 0 && owlClickCount < 5) {
            showSecretClickIndicator(owlClickCount);
        }
        
        // Si llega a 5 clics, activar modo admin
        if (owlClickCount >= 5) {
            owlClickCount = 0;
            showOwlMessage(e.clientX, e.clientY, "¡Has descubierto el modo secreto! 🎩✨");
            setTimeout(() => {
                activateAdminMode();
            }, 1500);
        }
        
        // Reiniciar contador después de 2 segundos sin clics
        clickTimeout = setTimeout(() => {
            if (owlClickCount > 0 && owlClickCount < 5) {
                showNotification('Combinación secreta', `Clics: ${owlClickCount}/5 - ¡Sigue intentando!`, 'info', 1500);
            }
            owlClickCount = 0;
        }, 2000);
    });
    
    // Función para mostrar mensajitos de la lechuza
    function showOwlMessage(x, y, customMessage = null) {
        // Crear burbuja de diálogo
        const bubble = document.createElement('div');
        bubble.className = 'owl-bubble';
        
        // Obtener mensaje aleatorio o usar el personalizado
        let message = customMessage;
        if (!message) {
            const timeOfDay = getTimeOfDay();
            const timeMessages = timeBasedMessages[timeOfDay];
            const allMessages = [...owlMessages, ...timeMessages];
            message = allMessages[Math.floor(Math.random() * allMessages.length)];
        }
        
        bubble.textContent = message;
        
        // Posicionar cerca del clic pero no encima del cursor
        const posX = x + 20;
        const posY = y - 50;
        
        bubble.style.cssText = `
            position: fixed;
            top: ${posY}px;
            left: ${posX}px;
            background: linear-gradient(145deg, rgba(40, 30, 15, 0.95), rgba(60, 50, 30, 0.92));
            color: #f0e6d2;
            padding: 12px 18px;
            border-radius: 20px;
            border: 2px solid rgba(180, 160, 110, 0.6);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
            z-index: 9998;
            font-family: 'Georgia', serif;
            font-size: 0.9rem;
            max-width: 250px;
            text-align: center;
            line-height: 1.4;
            transform: translateY(20px);
            opacity: 0;
            animation: bubbleAppear 0.4s ease-out forwards;
            pointer-events: none;
            backdrop-filter: blur(5px);
        `;
        
        // Añadir punta de globo de diálogo
        const arrow = document.createElement('div');
        arrow.style.cssText = `
            position: absolute;
            top: 100%;
            left: 15px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 15px solid rgba(40, 30, 15, 0.95);
            filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.3));
        `;
        
        bubble.appendChild(arrow);
        document.body.appendChild(bubble);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            bubble.style.animation = 'bubbleDisappear 0.5s ease-in forwards';
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, 500);
        }, 3000);
    }
    
    // Función para obtener la hora del día
    function getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 22) return 'evening';
        return 'night';
    }
    
    // Añadir animaciones CSS para las burbujas
    const bubbleStyles = document.createElement('style');
    bubbleStyles.textContent = `
        @keyframes bubbleAppear {
            0% { 
                transform: translateY(20px) scale(0.8); 
                opacity: 0; 
            }
            70% { 
                transform: translateY(-5px) scale(1.05); 
                opacity: 1; 
            }
            100% { 
                transform: translateY(0) scale(1); 
                opacity: 1; 
            }
        }
        
        @keyframes bubbleDisappear {
            0% { 
                transform: translateY(0) scale(1); 
                opacity: 1; 
            }
            100% { 
                transform: translateY(-20px) scale(0.8); 
                opacity: 0; 
            }
        }
        
        .owl-bubble {
            animation: bubbleFloat 3s ease-in-out infinite;
        }
        
        @keyframes bubbleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
        }
    `;
    document.head.appendChild(bubbleStyles);
    
    // Función para mostrar indicador visual de clics secretos
    function showSecretClickIndicator(count) {
        // Crear burbuja de indicador
        const indicator = document.createElement('div');
        indicator.textContent = `${count}/5`;
        indicator.style.cssText = `
            position: fixed;
            top: ${owl.getBoundingClientRect().top - 30}px;
            left: ${owl.getBoundingClientRect().left + owl.offsetWidth/2 - 20}px;
            background: rgba(255, 215, 0, 0.9);
            color: #1a1a2e;
            padding: 4px 8px;
            border-radius: 50%;
            font-size: 12px;
            font-weight: bold;
            z-index: 9999;
            animation: floatUp 1s forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(indicator);
        
        // Remover después de la animación
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 1000);
    }
    
    // Función para activar modo administrador
    function activateAdminMode() {
        // Verificar si ya está activo
        if (isAdminMode) {
            showNotification('Modo Admin Ya Activado', 'Ya tienes los poderes administrativos.', 'info');
            return;
        }
        
        const password = prompt("🔐 Ingresa la contraseña mágica para activar el modo administrador:");
        
        if (password === ADMIN_PASSWORD) {
            isAdminMode = true;
            showNotification('¡Modo Administrador Activado!', 'Ahora puedes escribir mensajes especiales y gestionar los pergaminos.', 'success');
            
            // Mostrar mensaje especial de la lechuza
            const owlRect = owl.getBoundingClientRect();
            showOwlMessage(owlRect.left + owlRect.width/2, owlRect.top, 
                "¡Modo Administrador activado! 👑\nAhora tienes poderes especiales.");
            
            // Efecto visual especial
            document.body.style.backgroundColor = 'rgba(255, 215, 0, 0.05)';
            setTimeout(() => {
                document.body.style.backgroundColor = '';
            }, 2000);
            
            addAdminControls();
        } else if (password !== null) {
            showNotification('Contraseña Incorrecta', 'La magia no responde a ese conjuro.', 'error');
        }
    }
    
    // Función para añadir controles de administrador
    function addAdminControls() {
        // Si ya existe la barra, no crear otra
        if (document.getElementById('adminBar')) return;
        
        // Crear barra de administrador
        const adminBar = document.createElement('div');
        adminBar.id = 'adminBar';
        adminBar.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(40, 30, 15, 0.97);
            padding: 12px 25px;
            border-radius: 10px;
            border: 2px solid gold;
            z-index: 9999;
            display: flex;
            gap: 15px;
            align-items: center;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.7);
            animation: slideDown 0.5s ease-out;
            backdrop-filter: blur(10px);
        `;
        
        // Añadir animación CSS para la barra
        const barStyle = document.createElement('style');
        barStyle.textContent = `
            @keyframes slideDown {
                from { top: -100px; opacity: 0; }
                to { top: 10px; opacity: 1; }
            }
        `;
        document.head.appendChild(barStyle);
        
        // Botón para escribir como administrador
        const adminWriteBtn = document.createElement('button');
        adminWriteBtn.innerHTML = '<span style="margin-right:5px;">📝</span> Escribir como Admin';
        adminWriteBtn.style.cssText = `
            background: linear-gradient(to bottom, rgba(90, 70, 40, 0.95), rgba(60, 40, 20, 0.98));
            color: #f0e6d2;
            border: 1px solid rgba(255, 215, 0, 0.6);
            padding: 10px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'Georgia', serif;
            font-size: 0.9rem;
            transition: all 0.3s;
            display: flex;
            align-items: center;
        `;
        adminWriteBtn.onmouseenter = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
        };
        adminWriteBtn.onmouseleave = function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        adminWriteBtn.onclick = function() {
            writeAsAdmin();
        };
        
        // Botón para borrar todos los mensajes
        const deleteAllBtn = document.createElement('button');
        deleteAllBtn.innerHTML = '<span style="margin-right:5px;">🗑️</span> Borrar Todos';
        deleteAllBtn.style.cssText = `
            background: linear-gradient(to bottom, rgba(120, 40, 40, 0.95), rgba(80, 20, 20, 0.98));
            color: #f0e6d2;
            border: 1px solid rgba(255, 100, 100, 0.6);
            padding: 10px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'Georgia', serif;
            font-size: 0.9rem;
            transition: all 0.3s;
            display: flex;
            align-items: center;
        `;
        deleteAllBtn.onmouseenter = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 100, 100, 0.3)';
        };
        deleteAllBtn.onmouseleave = function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        deleteAllBtn.onclick = function() {
            deleteAllMessages();
        };
        
        // Botón para salir del modo admin
        const exitAdminBtn = document.createElement('button');
        exitAdminBtn.innerHTML = '<span style="margin-right:5px;">🚪</span> Salir';
        exitAdminBtn.style.cssText = `
            background: rgba(80, 80, 80, 0.9);
            color: #f0e6d2;
            border: 1px solid rgba(180, 180, 180, 0.6);
            padding: 10px 18px;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'Georgia', serif;
            font-size: 0.9rem;
            transition: all 0.3s;
            display: flex;
            align-items: center;
        `;
        exitAdminBtn.onmouseenter = function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(180, 180, 180, 0.3)';
        };
        exitAdminBtn.onmouseleave = function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        exitAdminBtn.onclick = function() {
            exitAdminMode();
        };
        
        // Añadir indicador visual
        const indicator = document.createElement('div');
        indicator.innerHTML = '<span style="margin-right:8px;">👑</span> MODO ADMIN';
        indicator.style.cssText = `
            color: gold;
            font-weight: bold;
            margin-right: 15px;
            font-size: 1rem;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
            display: flex;
            align-items: center;
        `;
        
        // Añadir elementos a la barra
        adminBar.appendChild(indicator);
        adminBar.appendChild(adminWriteBtn);
        adminBar.appendChild(deleteAllBtn);
        adminBar.appendChild(exitAdminBtn);
        
        // Añadir la barra al documento
        document.body.appendChild(adminBar);
        
        // Añadir botones de borrado individual a cada mensaje
        addDeleteButtonsToMessages();
        
        // Remover estilo después de un tiempo
        setTimeout(() => {
            if (barStyle.parentNode) {
                barStyle.parentNode.removeChild(barStyle);
            }
        }, 1000);
    }
    
    // Función para salir del modo administrador
    function exitAdminMode() {
        isAdminMode = false;
        const adminBar = document.getElementById('adminBar');
        if (adminBar) {
            document.body.removeChild(adminBar);
        }
        showNotification('Modo Administrador Desactivado', 'La magia vuelve a su estado normal.', 'info');
        
        // Remover botones de borrado individual
        const deleteBtns = document.querySelectorAll('.delete-btn');
        deleteBtns.forEach(btn => {
            if (btn.parentNode) {
                btn.parentNode.removeChild(btn);
            }
        });
    }
    
    // Función para escribir como administrador
    function writeAsAdmin() {
        const adminMessage = prompt("📜 Escribe tu mensaje como administrador (aparecerá con un sello especial):");
        
        if (adminMessage && adminMessage.trim()) {
            const fullMessage = `👑 MENSAJE OFICIAL DE HOGWARTS:\n${adminMessage.trim()}`;
            saveMessage(fullMessage, true); // true = es mensaje de admin
            
            // Mostrar mensaje de la lechuza
            const owlRect = owl.getBoundingClientRect();
            showOwlMessage(owlRect.left + owlRect.width/2, owlRect.top, 
                "¡Mensaje oficial enviado con el sello real! 👑✨");
            
            showNotification('Mensaje Administrativo Enviado', 'Tu mensaje oficial ha sido publicado con el sello real.', 'success');
            loadMessages();
        }
    }
    
    // Función para borrar todos los mensajes
    function deleteAllMessages() {
        const messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        
        if (messages.length === 0) {
            showNotification('No hay mensajes', 'El archivo de la lechuza ya está vacío.', 'info');
            return;
        }
        
        const confirmDelete = confirm(`⚠️ ¿Estás seguro de querer borrar TODOS los mensajes?\n\nSe eliminarán ${messages.length} pergamino(s).\n\nEsta acción no se puede deshacer.`);
        
        if (confirmDelete) {
            localStorage.removeItem('owlMessages');
            messageCount = 0;
            
            // Mostrar mensaje de la lechuza
            const owlRect = owl.getBoundingClientRect();
            showOwlMessage(owlRect.left + owlRect.width/2, owlRect.top, 
                "¡Todos los pergaminos han sido mágicamente eliminados! 🧹✨");
            
            showNotification('¡Todos los mensajes borrados!', 'El archivo de la lechuza ha sido limpiado mágicamente.', 'success');
            loadMessages();
        }
    }
    
    // Función para añadir botones de borrado a cada mensaje
    function addDeleteButtonsToMessages() {
        const messages = document.querySelectorAll('.message-item');
        
        messages.forEach(messageElement => {
            // Verificar si ya tiene botón de borrado
            if (!messageElement.querySelector('.delete-btn')) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '×';
                deleteBtn.title = 'Borrar este mensaje';
                deleteBtn.style.cssText = `
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    background: rgba(180, 40, 40, 0.9);
                    color: white;
                    border: 1px solid rgba(255, 100, 100, 0.8);
                    border-radius: 50%;
                    width: 26px;
                    height: 26px;
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.8;
                    transition: all 0.3s;
                    z-index: 10;
                `;
                
                deleteBtn.onmouseenter = function() {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 0 10px rgba(255, 100, 100, 0.5)';
                };
                
                deleteBtn.onmouseleave = function() {
                    this.style.opacity = '0.8';
                    this.style.transform = '';
                    this.style.boxShadow = '';
                };
                
                deleteBtn.onclick = function(e) {
                    e.stopPropagation();
                    const messageId = messageElement.dataset.id;
                    deleteMessage(messageId);
                };
                
                // Añadir posición relativa al contenedor del mensaje
                messageElement.style.position = 'relative';
                messageElement.appendChild(deleteBtn);
            }
        });
    }
    
    // Función para borrar un mensaje específico
    function deleteMessage(messageId) {
        let messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        
        // Encontrar el mensaje para mostrar su contenido
        const messageToDelete = messages.find(msg => msg.id == messageId);
        
        if (!messageToDelete) return;
        
        const confirmDelete = confirm(`¿Borrar este mensaje?\n\n"${messageToDelete.text.substring(0, 100)}${messageToDelete.text.length > 100 ? '...' : ''}"`);
        
        if (confirmDelete) {
            // Filtrar para eliminar el mensaje con el ID especificado
            const initialLength = messages.length;
            messages = messages.filter(msg => msg.id != messageId);
            
            if (messages.length < initialLength) {
                localStorage.setItem('owlMessages', JSON.stringify(messages));
                
                // Mostrar mensaje de la lechuza
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width/2, owlRect.top, 
                    "¡Pergamino eliminado mágicamente! 🪄");
                
                showNotification('Mensaje eliminado', 'El pergamino ha sido destruido mágicamente.', 'success');
                loadMessages();
            }
        }
    }
    
    // Función para enviar mensaje
    function sendMessage() {
        const message = owlMessage.value.trim();
        
        // Validar mensaje
        if (!message) {
            showNotification('¡El pergamino está vacío!', 'Escribe algo mágico antes de enviar.', 'warning');
            owlMessage.focus();
            return;
        }
        
        if (message.length > 500) {
            showNotification('¡Pergamino demasiado largo!', 'Máximo 500 caracteres para la lechuza.', 'warning');
            return;
        }
        
        // Evitar múltiples envíos simultáneos
        if (isOwlFlying) {
            showNotification('¡La lechuza ya está volando!', 'Espera a que regrese para enviar otro mensaje.', 'info');
            return;
        }
        
        // Mostrar mensaje de la lechuza antes de enviar
        const owlRect = owl.getBoundingClientRect();
        showOwlMessage(owlRect.left + owlRect.width/2, owlRect.top, 
            "¡Lista para llevar tu mensaje! 🦉✉️");
        
        // Animación de envío
        setTimeout(() => {
            animateOwl();
        }, 800);
        
        // Guardar mensaje
        saveMessage(message, false);
        
        // Mostrar notificación
        showNotification('¡Mensaje enviado con magia!', 'Tu lechuza ha partido hacia su destino.', 'success');
        
        // Limpiar el campo de texto
        owlMessage.value = '';
        
        // Actualizar el tablero de mensajes
        loadMessages();
    }
    
    // Función para animar la lechuza
    function animateOwl() {
        isOwlFlying = true;
        
        // Añadir clase de animación
        owl.classList.add('owl-flying');
        
        // Deshabilitar botón durante el vuelo
        sendOwlBtn.disabled = true;
        sendOwlBtn.textContent = '🦉 La lechuza vuela...';
        
        // Restaurar después de la animación
        setTimeout(() => {
            owl.classList.remove('owl-flying');
            sendOwlBtn.disabled = false;
            sendOwlBtn.textContent = '✨ Enviar con la Lechuza';
            isOwlFlying = false;
            
            // Si estamos en modo admin, volver a añadir botones de borrado
            if (isAdminMode) {
                addDeleteButtonsToMessages();
            }
        }, 2000);
    }
    
    // Función para guardar mensaje en localStorage
    function saveMessage(message, isAdminMessage = false) {
        // Obtener mensajes existentes
        let messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        
        // Crear nuevo mensaje
        const newMessage = {
            id: Date.now(),
            text: message,
            date: new Date().toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            timestamp: Date.now(),
            isAdmin: isAdminMessage
        };
        
        // Añadir al principio del array
        messages.unshift(newMessage);
        
        // Limitar a 50 mensajes máximo
        if (messages.length > 50) {
            messages = messages.slice(0, 50);
        }
        
        // Guardar en localStorage
        localStorage.setItem('owlMessages', JSON.stringify(messages));
        
        // Incrementar contador
        messageCount++;
        
        // Notificar si es el primer mensaje
        if (messageCount === 1) {
            setTimeout(() => {
                showNotification('¡Primer mensaje mágico!', 'Tu pergamino ha sido guardado en el archivo de la lechuza.', 'info');
            }, 2500);
        }
    }
    
    // Función para cargar mensajes
    function loadMessages() {
        // Obtener mensajes
        const messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        
        // Limpiar tablero
        messageBoard.innerHTML = '';
        
        // Mostrar mensaje si no hay ninguno
        if (messages.length === 0) {
            messageBoard.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: rgba(180, 160, 110, 0.6); padding: 3rem 1rem; font-style: italic;">
                    <p>📭 No hay mensajes aún. ¡Envía el primero!</p>
                </div>
            `;
            return;
        }
        
        // Mostrar cada mensaje
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.dataset.id = message.id;
            
            // Estilo especial para mensajes de admin
            const isAdminMsg = message.isAdmin || message.text.includes('👑 MENSAJE OFICIAL');
            const borderColor = isAdminMsg ? 'rgba(255, 215, 0, 0.8)' : 'rgba(180, 160, 110, 0.6)';
            const bgColor = isAdminMsg ? 'rgba(45, 35, 20, 0.85)' : 'rgba(20, 30, 40, 0.7)';
            
            messageElement.style.borderLeftColor = borderColor;
            messageElement.style.background = bgColor;
            
            messageElement.innerHTML = `
                <div class="message-text">${escapeHtml(message.text)}</div>
                <div class="message-date">${isAdminMsg ? '👑 ' : '📅 '}${message.date}</div>
            `;
            messageBoard.appendChild(messageElement);
        });
        
        // Si estamos en modo admin, añadir botones de borrado
        if (isAdminMode) {
            addDeleteButtonsToMessages();
        }
    }
    
    // Función para mostrar notificaciones
    function showNotification(title, message, type = 'info', duration = 5000) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        // Icono según tipo
        let icon = '🔔';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'error') icon = '❌';
        if (type === 'info') icon = 'ℹ️';
        
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        // Añadir al documento
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Ocultar después del tiempo especificado
        setTimeout(() => {
            notification.classList.remove('show');
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, duration);
    }
    
    // Función para escapar HTML (seguridad)
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Efectos especiales para la lechuza
    owl.addEventListener('mouseenter', function() {
        if (!isOwlFlying) {
            this.style.filter = 'sepia(0.2) brightness(1) drop-shadow(0 0 15px rgba(180, 160, 110, 0.4))';
        }
    });
    
    owl.addEventListener('mouseleave', function() {
        if (!isOwlFlying) {
            this.style.filter = 'sepia(0.3) brightness(0.9)';
        }
    });
    
    // Cargar mensajes automáticamente cada 30 segundos
    setInterval(loadMessages, 30000);
    
    // Notificación de bienvenida
    setTimeout(() => {
        const hasMessages = localStorage.getItem('owlMessages');
        if (!hasMessages) {
            showNotification(
                '¡Bienvenido a la Lechuza Mensajera!', 
                'Escribe tu mensaje y la lechuza lo llevará mágicamente a su destino<br><small><i>¡Haz clic en la lechuza para escucharla hablar!</i></small>', 
                'info',
                6000
            );
            
            // Mostrar mensaje inicial de la lechuza
            setTimeout(() => {
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width/2, owlRect.top, 
                    "¡Hoo hoo! Estoy aquí para llevar tus mensajes 🦉✨\n¡Hazme clic para saber más!");
            }, 2000);
        }
    }, 1000);
    
    // Instrucciones para el administrador
    console.log(`%c🔮 Lechuza Mensajera - Instrucciones de Administrador:
    
    Métodos para activar el modo administrador:
    1. 🔥 Haz 5 clics RÁPIDOS en la lechuza
    2. ⌨️  Presiona Ctrl+Alt+M
    
    Contraseña: ${ADMIN_PASSWORD}
    
    Funciones disponibles en modo admin:
    - 📝 Escribir mensajes oficiales con sello 👑
    - 🗑️ Borrar mensajes individuales (botones ×)
    - 🗑️ Borrar TODOS los mensajes
    - 🚪 Salir del modo admin
    
    Nuevas características:
    - 🦉 La lechuza ahora habla al hacer clic
    - 💬 Mensajes según la hora del día
    - ✨ Diálogos en acciones importantes
    
    `, 'color: #f0e6d2; background: #1a1a2e; padding: 15px; border-radius: 8px; font-family: monospace;');
});



// ===============================
// 🦉 LECHUZA MENSAJERA AVANZADA
// ===============================

const owl = document.querySelector(".owl-container");
const sound = document.getElementById("owl-sound");

function openOwlMessage() {
  // sonido
  if (sound) sound.play();

  // scroll al mensaje mágico
  document
    .querySelector(".magic-valentine")
    ?.scrollIntoView({ behavior: "smooth" });

  // desaparecer
  owl.classList.add("hide");

  setTimeout(() => {
    owl.style.display = "none";
    owl.classList.remove("hide");
  }, 1000);
}

// CUANDO HACEN CLICK EN EL MENSAJE
function returnOwl() {
  owl.style.display = "block";
  owl.classList.add("show");

  // limpiar para futuras animaciones
  setTimeout(() => {
    owl.classList.remove("show");
  }, 2000);
}
