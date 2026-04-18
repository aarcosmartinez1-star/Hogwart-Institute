// =============================================
// HOGWARTS ACADEMY - SISTEMA DE CARTAS Y CONTADORES
// VERSIÓN MEJORADA - CON ESTADOS VISUALES CLAROS
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // CONFIGURACIÓN DE FECHAS
    // =============================================

    // Fecha del evento principal
    const targetDate = new Date(2026, 4, 19); // 19 de mayo de 2026

    // Fechas de desbloqueo de cada carta
    const giftDates = [
        new Date(2026, 1, 14), // Carta 1 → 14 febrero
        new Date(2026, 2, 14), // Carta 2 → 14 marzo
        new Date(2026, 3, 14), // Carta 3 → 14 abril
        new Date(2026, 4, 14), // Carta 4 → 14 mayo
        new Date(2026, 4, 19)  // Carta 5 → 19 mayo
    ];

    // Nombres legibles de las fechas para mostrar
    const giftDateNames = [
        "14 de Febrero, 2026",
        "14 de Marzo, 2026",
        "14 de Abril, 2026",
        "14 de Mayo, 2026",
        "19 de Mayo, 2026"
    ];

    // =============================================
    // ELEMENTOS DEL DOM
    // =============================================
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownText = document.getElementById('countdown-text');
    const currentDateEl = document.getElementById('current-date');
    const letterCards = document.querySelectorAll('.letter-card');
    const letterStatuses = [
        document.getElementById('status1'),
        document.getElementById('status2'),
        document.getElementById('status3'),
        document.getElementById('status4'),
        document.getElementById('status5')
    ];
    const countdownsSmall = [
        document.getElementById('countdown1'),
        document.getElementById('countdown2'),
        document.getElementById('countdown3'),
        document.getElementById('countdown4'),
        document.getElementById('countdown5')
    ];

    // Modal
    const modal = document.getElementById('letterModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalLetterContent = document.getElementById('modal-letter-content');

    // Almacenar estado de lectura en localStorage
    let readLetters = JSON.parse(localStorage.getItem('readLetters')) || {};

    // =============================================
    // MOSTRAR FECHA ACTUAL
    // =============================================
    const today = new Date();
    if (currentDateEl) {
        currentDateEl.textContent = today.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // =============================================
    // FUNCIÓN PARA FORMATEAR FECHA
    // =============================================
    function formatDate(date) {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // =============================================
    // FUNCIÓN PARA ACTUALIZAR CONTADOR PRINCIPAL
    // =============================================
    function updateCountdown() {
        const now = new Date();
        const timeDiff = targetDate.getTime() - now.getTime();

        if (timeDiff <= 0) {
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            if (countdownText) countdownText.textContent = '¡Es hoy! ¡Feliz Cumpleaños!';
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        if (countdownText) countdownText.textContent = `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;

        // Actualizar cada carta
        for (let i = 0; i < giftDates.length; i++) {
            updateCardDisplay(i, now);
        }
    }

    // =============================================
    // FUNCIÓN PRINCIPAL: ACTUALIZAR DISPLAY DE CADA CARTA
    // =============================================
    function updateCardDisplay(letterIndex, currentTime) {
        const giftDate = giftDates[letterIndex];
        const letterCard = letterCards[letterIndex];
        const statusEl = letterStatuses[letterIndex];
        const countdownSmall = countdownsSmall[letterIndex];
        const letterSeal = letterCard ? letterCard.querySelector('.letter-seal') : null;
        const icon = letterSeal ? letterSeal.querySelector('i') : null;
        
        if (!letterCard) return;

        const isUnlocked = currentTime >= giftDate;
        const isRead = readLetters[letterIndex] === true;

        if (isUnlocked) {
            // =============================================
            // CARTA DESBLOQUEADA
            // =============================================
            letterCard.classList.add('unlocked');
            
            // Cambiar sello a sobre abierto
            if (letterSeal) {
                letterSeal.classList.remove('sealed');
                if (icon) {
                    icon.className = 'fas fa-envelope-open';
                }
            }

            // Cambiar estado visual
            if (statusEl) {
                if (isRead) {
                    statusEl.textContent = '✓ LEÍDA';
                    statusEl.style.color = '#8a6d3b';
                    statusEl.style.background = 'linear-gradient(90deg, rgba(138, 109, 59, 0.15), rgba(138, 109, 59, 0.1), rgba(138, 109, 59, 0.15))';
                    statusEl.style.borderColor = 'rgba(138, 109, 59, 0.3)';
                } else {
                    statusEl.textContent = '✨ DESBLOQUEADA ✨';
                    statusEl.style.color = '#3c763d';
                    statusEl.style.background = 'linear-gradient(90deg, rgba(60, 118, 61, 0.2), rgba(60, 118, 61, 0.15), rgba(60, 118, 61, 0.2))';
                    statusEl.style.borderColor = 'rgba(60, 118, 61, 0.5)';
                }
            }

            // Mostrar mensaje de disponible en lugar del contador
            if (countdownSmall) {
                if (isRead) {
                    countdownSmall.innerHTML = `📅 Desbloqueada: ${giftDateNames[letterIndex]}`;
                    countdownSmall.style.background = 'linear-gradient(90deg, rgba(138, 109, 59, 0.2), rgba(138, 109, 59, 0.15), rgba(138, 109, 59, 0.2))';
                    countdownSmall.style.color = '#8a6d3b';
                    countdownSmall.style.borderColor = 'rgba(138, 109, 59, 0.4)';
                    countdownSmall.style.fontSize = '0.9rem';
                    countdownSmall.style.fontWeight = 'normal';
                } else {
                    countdownSmall.innerHTML = '✨ ¡CARTA DISPONIBLE! ✨';
                    countdownSmall.style.background = 'linear-gradient(90deg, rgba(60, 118, 61, 0.3), rgba(60, 118, 61, 0.2), rgba(60, 118, 61, 0.3))';
                    countdownSmall.style.color = '#3c763d';
                    countdownSmall.style.borderColor = 'rgba(60, 118, 61, 0.6)';
                    countdownSmall.style.fontSize = '1rem';
                    countdownSmall.style.fontWeight = 'bold';
                }
                countdownSmall.style.letterSpacing = '1px';
            }

            // Habilitar click para leer
            letterCard.style.cursor = 'pointer';
            letterCard.removeEventListener('click', letterClickHandler);
            letterCard.addEventListener('click', letterClickHandler);
            letterCard.dataset.index = letterIndex;

        } else {
            // =============================================
            // CARTA BLOQUEADA
            // =============================================
            letterCard.classList.remove('unlocked');
            
            // Cambiar sello a candado
            if (letterSeal) {
                letterSeal.classList.add('sealed');
                if (icon) {
                    icon.className = 'fas fa-lock';
                }
            }

            // Mostrar estado BLOQUEADA
            if (statusEl) {
                statusEl.textContent = '🔒 BLOQUEADA';
                statusEl.style.color = '#a94442';
                statusEl.style.background = 'linear-gradient(90deg, rgba(169, 68, 66, 0.15), rgba(169, 68, 66, 0.1), rgba(169, 68, 66, 0.15))';
                statusEl.style.borderColor = 'rgba(169, 68, 66, 0.3)';
            }

            // Mostrar contador regresivo
            if (countdownSmall) {
                const timeDiff = giftDate.getTime() - currentTime.getTime();
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                countdownSmall.innerHTML = `⏳ ${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
                countdownSmall.style.background = 'linear-gradient(90deg, rgba(138, 109, 59, 0.2), rgba(212, 193, 156, 0.15), rgba(138, 109, 59, 0.2))';
                countdownSmall.style.color = '#8a6d3b';
                countdownSmall.style.borderColor = 'rgba(138, 109, 59, 0.4)';
                countdownSmall.style.fontSize = '1rem';
                countdownSmall.style.fontWeight = 'bold';
                countdownSmall.style.letterSpacing = '1px';
            }

            // Deshabilitar click
            letterCard.style.cursor = 'default';
            letterCard.removeEventListener('click', letterClickHandler);
            delete letterCard.dataset.index;
        }
    }

    // =============================================
    // MANEJADOR DE CLIC PARA CARTAS
    // =============================================
    function letterClickHandler(event) {
        const card = event.currentTarget;
        const index = parseInt(card.dataset.index);
        if (!isNaN(index)) {
            openLetterModal(index);
        }
    }

    // =============================================
    // FUNCIÓN PARA MARCAR CARTA COMO LEÍDA
    // =============================================
    function markAsRead(letterIndex) {
        if (!readLetters[letterIndex]) {
            readLetters[letterIndex] = true;
            localStorage.setItem('readLetters', JSON.stringify(readLetters));
            
            // Actualizar la visualización de esta carta
            const now = new Date();
            updateCardDisplay(letterIndex, now);
            
            // Mostrar efecto de "carta leída"
            const letterCard = letterCards[letterIndex];
            if (letterCard) {
                letterCard.style.animation = 'none';
                setTimeout(() => {
                    letterCard.style.animation = '';
                }, 10);
            }
        }
    }

    // =============================================
    // FUNCIÓN PARA ABRIR MODAL
    // =============================================
    function openLetterModal(letterIndex) {
        const giftDate = giftDates[letterIndex];
        const now = new Date();

        // Verificar si la carta está desbloqueada
        if (now < giftDate) {
            showFloatingMessage('🔒 Carta Bloqueada', `Esta carta se desbloqueará el ${giftDateNames[letterIndex]}`, 'warning');
            return;
        }

        // Marcar como leída
        markAsRead(letterIndex);

        const letterTitles = [
            "COMUNICADO #1 - Día del Amor y la Amistad",
            "COMUNICADO #2 - Un Mes de Magia",
            "COMUNICADO #3 - Regalo de Primavera",
            "COMUNICADO #4 - La Varita de Saúco",
            "🎂 COMUNICADO ESPECIAL - ¡Feliz Cumpleaños Ximena! 🎂"
        ];

        const letterSubtitles = [
            `HOGWARTS - Departamento de Regalos Especiales | ${giftDateNames[letterIndex]}`,
            `HOGWARTS - Departamento de Sorpresas Continuas | ${giftDateNames[letterIndex]}`,
            `HOGWARTS - Departamento de Alegría Primaveral | ${giftDateNames[letterIndex]}`,
            `HOGWARTS - Departamento de Reliquias Mágicas | ${giftDateNames[letterIndex]}`,
            `HOGWARTS - Departamento de Celebraciones | ${giftDateNames[letterIndex]}`
        ];

        const letterContents = [
            // CARTA 1
            `
<h3>¡Feliz Día de San Valentín!</h3>

<p>
El Consejo Académico del
<strong>HOGWARTS - Academy of Magic and Science</strong>
se complace en informarte que has sido oficialmente aceptada
en el programa especial:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
"El Arte de Amar y Ser Amado"
</p>

<div style="background: linear-gradient(to right, #0e1a40, #222f5b); 
            color: #b0b0b0; 
            padding: 15px; 
            border-radius: 10px; 
            margin: 20px 0;
            border-left: 5px solid #946b2d;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
    <p style="text-align:center; font-weight:bold; color:#d4af37; margin-bottom:10px;">
        🦅 <strong>NOTA ESPECIAL DEL SOMBRERO SELECCIONADOR</strong> 🦅
    </p>
    <p style="font-style:italic; text-align:center;">
        "Tras una cuidadosa deliberación, he determinado que tu mente ágil, 
        tu sabiduría natural y tu curiosidad infinita te convierten en una 
        verdadera <strong>Ravenclaw</strong>. Tu corazón ama con la misma 
        intensidad con la que tu mente busca conocimiento. ¡Bienvenida a 
        la casa de la sabiduría y la creatividad!"
    </p>
    <div style="text-align:center; margin-top:10px;">
        <span style="color:#946b2d; font-weight:bold;">«Inteligencia más allá de la medida es el mayor tesoro del hombre»</span>
    </div>
</div>

<p>
Como símbolo de tu ingreso, se autoriza la entrega de tu
<strong>primer obsequio</strong>, marcando el inicio de una serie
de celebraciones guiadas por las antiguas tradiciones de la Academia.
</p>

<p>
Recuerda siempre: la magia más poderosa no se aprende en libros,
sino que nace del amor verdadero y la sabiduría del corazón.
</p>

<p style="margin-top:20px;">
Atentamente,<br>
🪄 <strong>Rectorado del HOGWARTS - Academy of Magic and Science</strong><br>
<span style="color:#0e1a40; font-weight:bold;">Casa Ravenclaw</span>
</p>
`,
            // CARTA 2
            `
<h3>Comunicado Académico Oficial</h3>

<p>
El <strong>HOGWARTS - Academy of Magic and Science</strong>
confirma tu permanencia y desempeño sobresaliente dentro del programa:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
"Magia Mensual de Sorpresas"
</p>

<p>
Tu constancia, dulzura y luz diaria han sido observadas
por el Consejo, quien ha determinado que mereces continuar
recibiendo los beneficios de este programa excepcional.
</p>

<p>
Por ello, se autoriza la entrega de tu
<strong>segundo obsequio</strong>, recordándote que tu magia
habita en cada día, no solo en fechas señaladas.
</p>

<p style="margin-top:20px;">
Atentamente,<br>
🪄 <strong>Rectorado del HOGWARTS - Academy of Magic and Science</strong>
</p>
`,
            // CARTA 3
            `
<h3>Notificación Estacional de la Academia</h3>

<p>
Con la llegada de la primavera, el
<strong>HOGWARTS - Academy of Magic and Science</strong>
anuncia tu aceptación dentro del programa:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
"Alegría Floreciente de Primavera"
</p>

<p>
Así como la magia renace en esta estación,
tu presencia transforma y da vida a todo lo que toca.
El Consejo reconoce tu capacidad de crecer,
florecer y amar con profundidad.
</p>

<p>
Se autoriza la entrega de tu
<strong>tercer obsequio</strong>, símbolo del crecimiento,
la esperanza y el amor que se fortalece con el tiempo.
</p>

<p style="margin-top:20px;">
Atentamente,<br>
🪄 <strong>Rectorado del HOGWARTS - Academy of Magic and Science</strong>
</p>
`,
            // CARTA 4
            `
<h3>Decreto Supremo del Consejo de la Academia</h3>

<p>
En una sesión solemne, el
<strong>HOGWARTS - Academy of Magic and Science</strong>
otorga un honor reservado únicamente para
magos y brujas de corazón excepcional:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.2em;">
La Varita de Saúco
</p>

<p>
Este artefacto legendario no elige al azar.
Solo responde ante quienes poseen una magia equilibrada,
una voluntad firme y un amor sincero.
</p>

<p>
Al recibirla, se te reconoce como portadora
de una magia antigua, noble y poderosa.
Que esta varita te acompañe como símbolo
de protección, sabiduría y lealtad eterna.
</p>

<p style="margin-top:30px; text-align:center; font-weight:bold;">
Con honor absoluto,<br>
🪄 Consejo Supremo del HOGWARTS - Academy of Magic and Science
</p>
`,
            // CARTA 5
            `
<h3>Celebración Oficial de la Academia</h3>

<p>
Hoy, el
<strong>HOGWARTS - Academy of Magic and Science</strong>
detiene sus actividades para celebrar una fecha extraordinaria:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
Cumpleaños de: Ximena García Mendieta 🎂
</p>

<p>
En este día se honra la llegada al mundo
de una magia capaz de transformar vidas,
crear felicidad y llenar corazones de luz.
</p>

<p>
Este no es un decreto ni una evaluación,
sino una celebración sincera de tu existencia.
Que este día esté lleno de alegría, amor
y momentos que recuerden lo especial que eres.
</p>

<p style="margin-top:30px; text-align:center; font-weight:bold;">
Con afecto eterno,<br>
🪄 HOGWARTS - Academy of Magic and Science
</p>
`
        ];

        if (modalTitle) modalTitle.textContent = letterTitles[letterIndex];
        if (modalSubtitle) modalSubtitle.textContent = letterSubtitles[letterIndex];
        if (modalLetterContent) modalLetterContent.innerHTML = letterContents[letterIndex];
        if (modal) modal.style.display = 'block';
    }

    // =============================================
    // FUNCIÓN PARA MOSTRAR MENSAJE FLOTANTE
    // =============================================
    function showFloatingMessage(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'floating-message';
        
        let icon = '🔔';
        if (type === 'success') icon = '✅';
        if (type === 'warning') icon = '⚠️';
        if (type === 'error') icon = '❌';
        if (type === 'info') icon = 'ℹ️';
        
        notification.innerHTML = `
            <div class="floating-icon">${icon}</div>
            <div class="floating-content">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(145deg, rgba(40, 55, 74, 0.95), rgba(30, 45, 64, 0.98));
            color: #f0d9a3;
            padding: 15px 25px;
            border-radius: 15px;
            border: 2px solid #8a6d3b;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            font-family: 'Cinzel', serif;
            backdrop-filter: blur(10px);
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 400px;
            min-width: 280px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 500);
        }, 4000);
    }

    // =============================================
    // CERRAR MODAL
    // =============================================
    if (closeModal) {
        closeModal.addEventListener('click', function () {
            if (modal) modal.style.display = 'none';
        });
    }

    if (window) {
        window.addEventListener('click', function (event) {
            if (modal && event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    // =============================================
    // INICIALIZAR
    // =============================================
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // =============================================
    // CONTADOR "SEGUIMOS TRABAJANDO"
    // =============================================
    const workTargetDate = new Date("2026-05-14T00:00:00").getTime();

    const wtDaysEl = document.getElementById("wt-days");
    const wtHoursEl = document.getElementById("wt-hours");
    const wtMinutesEl = document.getElementById("wt-minutes");
    const wtSecondsEl = document.getElementById("wt-seconds");

    function updateWorkTimer() {
        const now = new Date().getTime();
        const distance = workTargetDate - now;

        if (distance <= 0) {
            if (wtDaysEl) wtDaysEl.textContent = "00";
            if (wtHoursEl) wtHoursEl.textContent = "00";
            if (wtMinutesEl) wtMinutesEl.textContent = "00";
            if (wtSecondsEl) wtSecondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (wtDaysEl) wtDaysEl.textContent = String(days).padStart(2, "0");
        if (wtHoursEl) wtHoursEl.textContent = String(hours).padStart(2, "0");
        if (wtMinutesEl) wtMinutesEl.textContent = String(minutes).padStart(2, "0");
        if (wtSecondsEl) wtSecondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateWorkTimer();
    setInterval(updateWorkTimer, 1000);

    console.log("✨ Sistema de Cartas Mejorado - Hogwarts Academy ✨");
    console.log("📬 Estados: BLOQUEADA → DESBLOQUEADA → LEÍDA");
});