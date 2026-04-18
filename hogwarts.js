// =============================================
// HOGWARTS ACADEMY - INTERACTIVIDAD GENERAL
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // CAMBIAR FONDO
    // =============================================
    const bgSelect = document.getElementById('bg-select');

    const backgrounds = [
        {
            name: "Fondo Clásico Howard",
            image: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        },
        {
            name: "Biblioteca Vintage",
            image: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80')"
        },
        {
            name: "Aurora Mágica",
            image: "url('https://images.unsplash.com/photo-1522124624696-7ea32eb9592c?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        },
        {
            name: "Estrellas Nocturnas",
            image: "url('https://images.unsplash.com/photo-1585588985526-9459c1bb9e9e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        },
        {
            name: "Pergamino Antiguo",
            image: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80')"
        }
    ];

    if (bgSelect) {
        bgSelect.addEventListener('change', function () {
            const selectedBg = backgrounds[this.value - 1];
            document.body.style.backgroundImage = selectedBg.image;
        });
    }

    // =============================================
    // MÚSICA DE FONDO
    // =============================================
    const music = document.getElementById("bg-music");
    const playPauseBtn = document.getElementById("play-pause-btn");

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            if (music.paused) {
                music.play();
                this.innerHTML = '<i class="fas fa-pause"></i> Pausar Música';
            } else {
                music.pause();
                this.innerHTML = '<i class="fas fa-play"></i> Reproducir Música';
            }
        });
    }

    // Primer clic en cualquier parte para iniciar música
    document.addEventListener("click", () => {
        if (music && music.paused) {
            music.volume = 0.35;
            music.play().catch(e => console.log("Auto-play bloqueado:", e));
        }
    }, { once: true });

    // =============================================
    // CINETECA MÁGICA
    // =============================================
    const cinetecaSection = document.getElementById('cineteca-magica');
    const playMagicBtn = document.getElementById('playMagicBtn');
    const videoIframe = document.getElementById('cineteca-video');

    console.log('Cineteca Mágica cargando...');

    if (cinetecaSection && cinetecaSection.classList.contains('hidden-magic')) {
        cinetecaSection.classList.remove('hidden-magic');
    }

    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles');
        cinetecaSection.appendChild(particlesContainer);

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 6 + 2;
            const startX = Math.random() * 100;
            const colors = [
                'rgba(240, 217, 163, 0.9)',
                'rgba(212, 193, 156, 0.8)',
                'rgba(138, 109, 59, 0.7)',
                'rgba(103, 58, 183, 0.6)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}%`;
            particle.style.top = '100%';
            particle.style.backgroundColor = color;
            particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
            particle.style.animationDelay = `${Math.random() * 3}s`;

            particlesContainer.appendChild(particle);
        }
    }

    function playVideo() {
        if (!videoIframe) return;
        try {
            let videoSrc = videoIframe.src;
            if (videoSrc.indexOf('autoplay=1') === -1) {
                const separator = videoSrc.indexOf('?') !== -1 ? '&' : '?';
                videoIframe.src = videoSrc + separator + 'autoplay=1&mute=0';
            }
            videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } catch (error) {
            videoIframe.src = videoIframe.src;
        }
    }

    if (playMagicBtn) {
        playMagicBtn.addEventListener('click', function () {
            playVideo();
            const originalText = this.innerHTML;
            this.innerHTML = '🎬 Proyección Mágica...';
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 40px rgba(138, 109, 59, 0.8), 0 5px 20px rgba(0, 0, 0, 0.6)';
            this.disabled = true;
            createSparkleEffect(this);
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.transform = '';
                this.style.boxShadow = '';
                this.disabled = false;
            }, 5000);
        });
    }

    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '8px';
            sparkle.style.height = '8px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = '#f0d9a3';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10000';
            sparkle.style.boxShadow = '0 0 15px rgba(240, 217, 163, 0.8)';
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;
            sparkle.style.left = `${startX}px`;
            sparkle.style.top = `${startY}px`;
            document.body.appendChild(sparkle);
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 100;
            const duration = 400 + Math.random() * 600;
            const animation = sparkle.animate([
                { transform: `translate(0, 0) scale(1)`, opacity: 1, boxShadow: '0 0 20px rgba(240, 217, 163, 1)' },
                { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.2)`, opacity: 0, boxShadow: '0 0 5px rgba(240, 217, 163, 0.3)' }
            ], { duration: duration, easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)' });
            animation.onfinish = () => { if (document.body.contains(sparkle)) document.body.removeChild(sparkle); };
        }
    }

    if (cinetecaSection) {
        setTimeout(() => { createParticles(); }, 1000);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && videoIframe) {
                videoIframe.src = videoIframe.src;
            }
        });
    }, { threshold: 0.1 });

    if (cinetecaSection) observer.observe(cinetecaSection);

    console.log("✨ Hogwarts Academy - Módulo General cargado ✨");
});

// =============================================
// LECHUZA MENSAJERA
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    const owl = document.getElementById('owl');
    const owlMessage = document.getElementById('owlMessage');
    const sendOwlBtn = document.getElementById('sendOwlBtn');
    const messageBoard = document.getElementById('messageBoard');

    let isOwlFlying = false;
    let messageCount = 0;
    let isAdminMode = false;
    let owlClickCount = 0;
    let clickTimeout = null;
    const ADMIN_PASSWORD = "Althea16";

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

    const timeBasedMessages = {
        morning: ["¡Buenos días! Es un día perfecto para enviar mensajes ☀️", "La mañana trae nuevos mensajes 🌄"],
        afternoon: ["La tarde es ideal para escribir 📝", "El sol nos ilumina el camino 🌤️"],
        evening: ["¡Buenas tardes! Las sombras alargan mi vuelo 🌆", "La magia se intensifica al atardecer ✨"],
        night: ["¡Buenas noches! Las estrellas son mi guía 🌌", "La luna ilumina mi camino nocturno 🌙"]
    };

    loadMessages();

    if (sendOwlBtn) sendOwlBtn.addEventListener('click', sendMessage);
    if (owlMessage) {
        owlMessage.addEventListener('keydown', function (e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') sendMessage();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.altKey && e.key === 'm') activateAdminMode();
    });

    if (owl) {
        owl.addEventListener('click', function (e) {
            if (isOwlFlying) return;
            if (clickTimeout) clearTimeout(clickTimeout);
            owlClickCount++;
            owl.style.transform = 'scale(0.95)';
            setTimeout(() => { owl.style.transform = ''; }, 100);
            if (owlClickCount < 5) showOwlMessage(e.clientX, e.clientY);
            if (owlClickCount > 0 && owlClickCount < 5) showSecretClickIndicator(owlClickCount);
            if (owlClickCount >= 5) {
                owlClickCount = 0;
                showOwlMessage(e.clientX, e.clientY, "¡Has descubierto el modo secreto! 🎩✨");
                setTimeout(() => { activateAdminMode(); }, 1500);
            }
            clickTimeout = setTimeout(() => {
                if (owlClickCount > 0 && owlClickCount < 5) {
                    showNotification('Combinación secreta', `Clics: ${owlClickCount}/5 - ¡Sigue intentando!`, 'info', 1500);
                }
                owlClickCount = 0;
            }, 2000);
        });
    }

    function showOwlMessage(x, y, customMessage = null) {
        const bubble = document.createElement('div');
        bubble.className = 'owl-bubble';
        let message = customMessage;
        if (!message) {
            const timeOfDay = getTimeOfDay();
            const timeMessages = timeBasedMessages[timeOfDay];
            const allMessages = [...owlMessages, ...timeMessages];
            message = allMessages[Math.floor(Math.random() * allMessages.length)];
        }
        bubble.textContent = message;
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
        setTimeout(() => {
            bubble.style.animation = 'bubbleDisappear 0.5s ease-in forwards';
            setTimeout(() => { if (bubble.parentNode) bubble.parentNode.removeChild(bubble); }, 500);
        }, 3000);
    }

    function getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 18) return 'afternoon';
        if (hour >= 18 && hour < 22) return 'evening';
        return 'night';
    }

    const bubbleStyles = document.createElement('style');
    bubbleStyles.textContent = `
        @keyframes bubbleAppear {
            0% { transform: translateY(20px) scale(0.8); opacity: 0; }
            70% { transform: translateY(-5px) scale(1.05); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes bubbleDisappear {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-20px) scale(0.8); opacity: 0; }
        }
        .owl-bubble { animation: bubbleFloat 3s ease-in-out infinite; }
        @keyframes bubbleFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    `;
    document.head.appendChild(bubbleStyles);

    function showSecretClickIndicator(count) {
        if (!owl) return;
        const indicator = document.createElement('div');
        indicator.textContent = `${count}/5`;
        indicator.style.cssText = `
            position: fixed;
            top: ${owl.getBoundingClientRect().top - 30}px;
            left: ${owl.getBoundingClientRect().left + owl.offsetWidth / 2 - 20}px;
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
        setTimeout(() => { if (indicator.parentNode) indicator.parentNode.removeChild(indicator); }, 1000);
    }

    function activateAdminMode() {
        if (isAdminMode) {
            showNotification('Modo Admin Ya Activado', 'Ya tienes los poderes administrativos.', 'info');
            return;
        }
        const password = prompt("🔐 Ingresa la contraseña mágica para activar el modo administrador:");
        if (password === ADMIN_PASSWORD) {
            isAdminMode = true;
            showNotification('¡Modo Administrador Activado!', 'Ahora puedes escribir mensajes especiales y gestionar los pergaminos.', 'success');
            if (owl) {
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top, "¡Modo Administrador activado! 👑\nAhora tienes poderes especiales.");
            }
            document.body.style.backgroundColor = 'rgba(255, 215, 0, 0.05)';
            setTimeout(() => { document.body.style.backgroundColor = ''; }, 2000);
            addAdminControls();
        } else if (password !== null) {
            showNotification('Contraseña Incorrecta', 'La magia no responde a ese conjuro.', 'error');
        }
    }

    function addAdminControls() {
        if (document.getElementById('adminBar')) return;
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
        const barStyle = document.createElement('style');
        barStyle.textContent = `@keyframes slideDown { from { top: -100px; opacity: 0; } to { top: 10px; opacity: 1; } }`;
        document.head.appendChild(barStyle);
        
        const adminWriteBtn = document.createElement('button');
        adminWriteBtn.innerHTML = '<span style="margin-right:5px;">📝</span> Escribir como Admin';
        adminWriteBtn.style.cssText = `background: linear-gradient(to bottom, rgba(90, 70, 40, 0.95), rgba(60, 40, 20, 0.98)); color: #f0e6d2; border: 1px solid rgba(255, 215, 0, 0.6); padding: 10px 18px; border-radius: 6px; cursor: pointer; font-family: 'Georgia', serif; font-size: 0.9rem; transition: all 0.3s; display: flex; align-items: center;`;
        adminWriteBtn.onclick = () => writeAsAdmin();
        
        const deleteAllBtn = document.createElement('button');
        deleteAllBtn.innerHTML = '<span style="margin-right:5px;">🗑️</span> Borrar Todos';
        deleteAllBtn.style.cssText = `background: linear-gradient(to bottom, rgba(120, 40, 40, 0.95), rgba(80, 20, 20, 0.98)); color: #f0e6d2; border: 1px solid rgba(255, 100, 100, 0.6); padding: 10px 18px; border-radius: 6px; cursor: pointer; font-family: 'Georgia', serif; font-size: 0.9rem; transition: all 0.3s; display: flex; align-items: center;`;
        deleteAllBtn.onclick = () => deleteAllMessages();
        
        const exitAdminBtn = document.createElement('button');
        exitAdminBtn.innerHTML = '<span style="margin-right:5px;">🚪</span> Salir';
        exitAdminBtn.style.cssText = `background: rgba(80, 80, 80, 0.9); color: #f0e6d2; border: 1px solid rgba(180, 180, 180, 0.6); padding: 10px 18px; border-radius: 6px; cursor: pointer; font-family: 'Georgia', serif; font-size: 0.9rem; transition: all 0.3s; display: flex; align-items: center;`;
        exitAdminBtn.onclick = () => exitAdminMode();
        
        const indicator = document.createElement('div');
        indicator.innerHTML = '<span style="margin-right:8px;">👑</span> MODO ADMIN';
        indicator.style.cssText = `color: gold; font-weight: bold; margin-right: 15px; font-size: 1rem; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); display: flex; align-items: center;`;
        
        adminBar.appendChild(indicator);
        adminBar.appendChild(adminWriteBtn);
        adminBar.appendChild(deleteAllBtn);
        adminBar.appendChild(exitAdminBtn);
        document.body.appendChild(adminBar);
        addDeleteButtonsToMessages();
        setTimeout(() => { if (barStyle.parentNode) barStyle.parentNode.removeChild(barStyle); }, 1000);
    }

    function exitAdminMode() {
        isAdminMode = false;
        const adminBar = document.getElementById('adminBar');
        if (adminBar) adminBar.remove();
        showNotification('Modo Administrador Desactivado', 'La magia vuelve a su estado normal.', 'info');
        document.querySelectorAll('.delete-btn').forEach(btn => btn.remove());
    }

    function writeAsAdmin() {
        const adminMessage = prompt("📜 Escribe tu mensaje como administrador (aparecerá con un sello especial):");
        if (adminMessage && adminMessage.trim()) {
            saveMessage(`👑 MENSAJE OFICIAL DE HOGWARTS:\n${adminMessage.trim()}`, true);
            if (owl) {
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top, "¡Mensaje oficial enviado con el sello real! 👑✨");
            }
            showNotification('Mensaje Administrativo Enviado', 'Tu mensaje oficial ha sido publicado con el sello real.', 'success');
            loadMessages();
        }
    }

    function deleteAllMessages() {
        const messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        if (messages.length === 0) {
            showNotification('No hay mensajes', 'El archivo de la lechuza ya está vacío.', 'info');
            return;
        }
        if (confirm(`⚠️ ¿Estás seguro de querer borrar TODOS los mensajes?\n\nSe eliminarán ${messages.length} pergamino(s).`)) {
            localStorage.removeItem('owlMessages');
            messageCount = 0;
            if (owl) {
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top, "¡Todos los pergaminos han sido mágicamente eliminados! 🧹✨");
            }
            showNotification('¡Todos los mensajes borrados!', 'El archivo de la lechuza ha sido limpiado mágicamente.', 'success');
            loadMessages();
        }
    }

    function addDeleteButtonsToMessages() {
        document.querySelectorAll('.message-item').forEach(msgElement => {
            if (!msgElement.querySelector('.delete-btn')) {
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-btn';
                deleteBtn.innerHTML = '×';
                deleteBtn.style.cssText = `position: absolute; top: 8px; right: 8px; background: rgba(180, 40, 40, 0.9); color: white; border: 1px solid rgba(255, 100, 100, 0.8); border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 18px; font-weight: bold; display: flex; align-items: center; justify-content: center; opacity: 0.8; transition: all 0.3s; z-index: 10;`;
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    deleteMessage(msgElement.dataset.id);
                };
                msgElement.style.position = 'relative';
                msgElement.appendChild(deleteBtn);
            }
        });
    }

    function deleteMessage(messageId) {
        let messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        const messageToDelete = messages.find(msg => msg.id == messageId);
        if (!messageToDelete) return;
        if (confirm(`¿Borrar este mensaje?\n\n"${messageToDelete.text.substring(0, 100)}${messageToDelete.text.length > 100 ? '...' : ''}"`)) {
            messages = messages.filter(msg => msg.id != messageId);
            localStorage.setItem('owlMessages', JSON.stringify(messages));
            if (owl) {
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top, "¡Pergamino eliminado mágicamente! 🪄");
            }
            showNotification('Mensaje eliminado', 'El pergamino ha sido destruido mágicamente.', 'success');
            loadMessages();
        }
    }

    function sendMessage() {
        const message = owlMessage ? owlMessage.value.trim() : '';
        if (!message) {
            showNotification('¡El pergamino está vacío!', 'Escribe algo mágico antes de enviar.', 'warning');
            if (owlMessage) owlMessage.focus();
            return;
        }
        if (message.length > 500) {
            showNotification('¡Pergamino demasiado largo!', 'Máximo 500 caracteres para la lechuza.', 'warning');
            return;
        }
        if (isOwlFlying) {
            showNotification('¡La lechuza ya está volando!', 'Espera a que regrese para enviar otro mensaje.', 'info');
            return;
        }
        if (owl) {
            const owlRect = owl.getBoundingClientRect();
            showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top, "¡Lista para llevar tu mensaje! 🦉✉️");
        }
        setTimeout(() => animateOwl(), 800);
        saveMessage(message, false);
        showNotification('¡Mensaje enviado con magia!', 'Tu lechuza ha partido hacia su destino.', 'success');
        if (owlMessage) owlMessage.value = '';
        loadMessages();
    }

    function animateOwl() {
        if (!owl) return;
        isOwlFlying = true;
        owl.classList.add('owl-flying');
        if (sendOwlBtn) {
            sendOwlBtn.disabled = true;
            sendOwlBtn.textContent = '🦉 La lechuza vuela...';
        }
        setTimeout(() => {
            owl.classList.remove('owl-flying');
            if (sendOwlBtn) {
                sendOwlBtn.disabled = false;
                sendOwlBtn.textContent = '✨ Enviar con la Lechuza';
            }
            isOwlFlying = false;
            if (isAdminMode) addDeleteButtonsToMessages();
        }, 2000);
    }

    function saveMessage(message, isAdminMessage = false) {
        let messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        const newMessage = {
            id: Date.now(),
            text: message,
            date: new Date().toLocaleString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now(),
            isAdmin: isAdminMessage
        };
        messages.unshift(newMessage);
        if (messages.length > 50) messages = messages.slice(0, 50);
        localStorage.setItem('owlMessages', JSON.stringify(messages));
        messageCount++;
        if (messageCount === 1) {
            setTimeout(() => showNotification('¡Primer mensaje mágico!', 'Tu pergamino ha sido guardado en el archivo de la lechuza.', 'info'), 2500);
        }
    }

    function loadMessages() {
        if (!messageBoard) return;
        const messages = JSON.parse(localStorage.getItem('owlMessages')) || [];
        messageBoard.innerHTML = '';
        if (messages.length === 0) {
            messageBoard.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: rgba(180, 160, 110, 0.6); padding: 3rem 1rem; font-style: italic;"><p>📭 No hay mensajes aún. ¡Envía el primero!</p></div>`;
            return;
        }
        messages.forEach(message => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.dataset.id = message.id;
            const isAdminMsg = message.isAdmin || message.text.includes('👑 MENSAJE OFICIAL');
            messageElement.style.borderLeftColor = isAdminMsg ? 'rgba(255, 215, 0, 0.8)' : 'rgba(180, 160, 110, 0.6)';
            messageElement.style.background = isAdminMsg ? 'rgba(45, 35, 20, 0.85)' : 'rgba(20, 30, 40, 0.7)';
            messageElement.innerHTML = `<div class="message-text">${escapeHtml(message.text)}</div><div class="message-date">${isAdminMsg ? '👑 ' : '📅 '}${message.date}</div>`;
            messageBoard.appendChild(messageElement);
        });
        if (isAdminMode) addDeleteButtonsToMessages();
    }

    function showNotification(title, message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        let icon = '🔔';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'error') icon = '❌';
        if (type === 'info') icon = 'ℹ️';
        notification.innerHTML = `<div class="notification-icon">${icon}</div><div class="notification-content"><h4>${title}</h4><p>${message}</p></div>`;
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => { if (notification.parentNode) notification.remove(); }, 500);
        }, duration);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    if (owl) {
        owl.addEventListener('mouseenter', function () {
            if (!isOwlFlying) this.style.filter = 'sepia(0.2) brightness(1) drop-shadow(0 0 15px rgba(180, 160, 110, 0.4))';
        });
        owl.addEventListener('mouseleave', function () {
            if (!isOwlFlying) this.style.filter = 'sepia(0.3) brightness(0.9)';
        });
    }

    setInterval(loadMessages, 30000);

    setTimeout(() => {
        if (!localStorage.getItem('owlMessages') && owl) {
            showNotification('¡Bienvenido a la Lechuza Mensajera!', 'Escribe tu mensaje y la lechuza lo llevará mágicamente a su destino<br><small><i>¡Haz clic en la lechuza para escucharla hablar!</i></small>', 'info', 6000);
            setTimeout(() => {
                const owlRect = owl.getBoundingClientRect();
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top, "¡Hoo hoo! Estoy aquí para llevar tus mensajes 🦉✨\n¡Hazme clic para saber más!");
            }, 2000);
        }
    }, 1000);

    console.log(`%c🔮 Lechuza Mensajera - Modo Admin: 5 clics en la lechuza o Ctrl+Alt+M\nContraseña: ${ADMIN_PASSWORD}`, 'color: #f0e6d2; background: #1a1a2e; padding: 15px; border-radius: 8px; font-family: monospace;');
});

// =============================================
// SOMBRERO SELECCIONADOR
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    const continueBtn = document.getElementById('continueBtn');
    const startBtn = document.getElementById('startSelection');
    const resetBtn = document.getElementById('resetSelection');
    const houses = document.querySelectorAll('.house-card');
    const counterNumber = document.querySelector('.counter-number');
    const selectionResult = document.getElementById('selectionResult');
    const selectorParticles = document.getElementById('selectorParticles');
    const hatIntro = document.getElementById('hatIntro');
    const selectorTitle = document.getElementById('selectorTitle');
    const selectorSubtitle = document.getElementById('selectorSubtitle');
    const housesContainer = document.getElementById('housesContainer');
    const selectionCounter = document.getElementById('selectionCounter');

    let selectionInterval;
    let currentHouseIndex = 0;
    let counter = 0;
    const totalSelections = 10;

    if (continueBtn) continueBtn.addEventListener('click', showHouses);
    if (startBtn) startBtn.addEventListener('click', startSelectionProcess);
    if (resetBtn) resetBtn.addEventListener('click', resetSelection);

    function showHouses() {
        if (!hatIntro || !selectorTitle || !selectorSubtitle || !housesContainer || !selectionCounter || !startBtn || !selectionResult) return;
        hatIntro.classList.add('hidden');
        setTimeout(() => { selectorTitle.classList.remove('hidden-magic'); selectorTitle.classList.add('show-magic'); }, 300);
        setTimeout(() => { selectorSubtitle.classList.remove('hidden-magic'); selectorSubtitle.classList.add('show-magic'); }, 600);
        setTimeout(() => {
            housesContainer.classList.remove('hidden-magic');
            housesContainer.classList.add('visible');
            selectionCounter.classList.remove('hidden-magic');
            selectionCounter.classList.add('visible');
            startBtn.classList.remove('hidden-magic');
            startBtn.classList.add('visible');
            selectionResult.classList.remove('hidden-magic');
        }, 900);
    }

    function startSelectionProcess() {
        if (!startBtn || !counterNumber || !selectionResult || !houses.length) return;
        startBtn.disabled = true;
        startBtn.textContent = 'Seleccionando...';
        counter = 0;
        currentHouseIndex = 0;
        if (counterNumber) counterNumber.textContent = '0';
        selectionResult.classList.remove('final-state');
        selectionResult.classList.add('initial-state');
        houses.forEach(house => house.classList.remove('active', 'light-up', 'winner'));
        clearParticles();
        createConfetti();
        selectionInterval = setInterval(performSelection, 300);
    }

    function performSelection() {
        if (!houses.length || !counterNumber) return;
        houses.forEach(house => house.classList.remove('active'));
        if (houses[currentHouseIndex]) houses[currentHouseIndex].classList.remove('light-up');
        currentHouseIndex = (currentHouseIndex + 1) % houses.length;
        houses[currentHouseIndex].classList.add('active', 'light-up');
        counter++;
        if (counterNumber) counterNumber.textContent = counter;
        createSelectionParticle(currentHouseIndex);
        if (counter >= totalSelections) {
            clearInterval(selectionInterval);
            setTimeout(() => {
                houses.forEach(house => {
                    house.classList.remove('active', 'light-up');
                    if (house.classList.contains('ravenclaw')) house.classList.add('active', 'winner');
                });
                revealHouseResult();
            }, 800);
        }
    }

    function revealHouseResult() {
        if (!selectionResult || !startBtn) return;
        createRevealParticles();
        setTimeout(() => {
            selectionResult.classList.remove('initial-state');
            selectionResult.classList.add('final-state');
            createRavenclawConfetti();
            startBtn.disabled = false;
            startBtn.textContent = 'Repetir Selección';
        }, 500);
    }

    function resetSelection() {
        if (!selectionResult || !startBtn || !counterNumber || !houses.length) return;
        selectionResult.classList.remove('final-state');
        selectionResult.classList.add('initial-state');
        houses.forEach(house => house.classList.remove('active', 'winner', 'light-up'));
        if (counterNumber) counterNumber.textContent = '0';
        clearParticles();
        startBtn.disabled = false;
        startBtn.textContent = 'Comenzar Selección';
    }

    function createSelectionParticle(houseIndex) {
        if (!selectorParticles || !houses[houseIndex]) return;
        const house = houses[houseIndex];
        const rect = house.getBoundingClientRect();
        const selectorSection = document.querySelector('.selector-section');
        if (!selectorSection) return;
        const selectorRect = selectorSection.getBoundingClientRect();
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.left = (rect.left - selectorRect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top - selectorRect.top) + 'px';
        if (house.classList.contains('gryffindor')) particle.style.backgroundColor = '#ae0001';
        else if (house.classList.contains('slytherin')) particle.style.backgroundColor = '#2a623d';
        else if (house.classList.contains('hufflepuff')) particle.style.backgroundColor = '#ffdb00';
        else if (house.classList.contains('ravenclaw')) particle.style.backgroundColor = '#0e1a40';
        particle.style.animationDuration = '1.5s';
        selectorParticles.appendChild(particle);
        setTimeout(() => { if (particle.parentNode) particle.remove(); }, 1500);
    }

    function createRevealParticles() {
        const revealParticles = document.getElementById('revealParticles');
        if (!revealParticles) return;
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('reveal-particle');
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `50%`;
            particle.style.top = `50%`;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            particle.style.animation = `particleBurst 1s ease-out forwards`;
            particle.style.animationDelay = `${Math.random() * 0.3}s`;
            revealParticles.appendChild(particle);
            setTimeout(() => { if (particle.parentNode) particle.remove(); }, 1300);
        }
    }

    function createConfetti() {
        if (!selectorParticles) return;
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti', 'ravenclaw');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 1 + 's';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            selectorParticles.appendChild(confetti);
            setTimeout(() => { if (confetti.parentNode) confetti.remove(); }, 3000);
        }
    }

    function createRavenclawConfetti() {
        const resultContainer = document.getElementById('selectionResult');
        if (!resultContainer) return;
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti', 'ravenclaw');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            resultContainer.appendChild(confetti);
            setTimeout(() => { if (confetti.parentNode) confetti.remove(); }, 3000);
        }
    }

    function clearParticles() {
        if (selectorParticles) {
            while (selectorParticles.firstChild) selectorParticles.removeChild(selectorParticles.firstChild);
        }
        const revealParticles = document.getElementById('revealParticles');
        if (revealParticles) {
            while (revealParticles.firstChild) revealParticles.removeChild(revealParticles.firstChild);
        }
        document.querySelectorAll('.confetti').forEach(c => c.remove());
    }

    console.log('Sombrero Seleccionador cargado correctamente');
});