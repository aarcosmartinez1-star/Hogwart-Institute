// =============================================
// HOGWARTS ACADEMY - JAVASCRIPT UNIFICADO (CORREGIDO)
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // CONFIGURACIÓN DE FECHAS
    // =============================================

    const targetDate = new Date(2026, 4, 19); // 19 de mayo de 2026

    const giftDates = [
        new Date(2026, 1, 14), // Carta 1 → 14 febrero
        new Date(2026, 2, 14), // Carta 2 → 14 marzo
        new Date(2026, 3, 14), // Carta 3 → 14 abril
        new Date(2026, 4, 14), // Carta 4 → 14 mayo
        new Date(2026, 4, 19)  // Carta 5 → 19 mayo
    ];

    // =============================================
    // ELEMENTOS DEL DOM PRINCIPALES
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

    // Fondo
    const bgSelect = document.getElementById('bg-select');

    // =============================================
    // MOSTRAR FECHA ACTUAL
    // =============================================
    const today = new Date();
    currentDateEl.textContent = today.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // =============================================
    // CAMBIAR FONDO
    // =============================================
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

    bgSelect.addEventListener('change', function () {
        const selectedBg = backgrounds[this.value - 1];
        document.body.style.backgroundImage = selectedBg.image;
    });

    // =============================================
    // FUNCIÓN PARA ACTUALIZAR CONTADOR PRINCIPAL
    // =============================================
    function updateCountdown() {
        const now = new Date();
        const timeDiff = targetDate.getTime() - now.getTime();

        if (timeDiff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            countdownText.textContent = '¡Es hoy! ¡Feliz Cumpleaños!';
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');

        countdownText.textContent = `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;

        // *** CORRECCIÓN: Primero actualizamos los contadores pequeños ***
        for (let i = 0; i < giftDates.length; i++) {
            updateSmallCountdown(i, now);
        }

        // *** LUEGO verificamos y actualizamos el estado de desbloqueo ***
        for (let i = 0; i < giftDates.length; i++) {
            checkAndUnlockLetter(i, now);
        }
    }

    // =============================================
    // FUNCIÓN PARA VERIFICAR Y DESBLOQUEAR CARTAS (CORREGIDA)
    // =============================================
    function checkAndUnlockLetter(letterIndex, currentTime) {
        const giftDate = giftDates[letterIndex];

        const letterCard = letterCards[letterIndex];
        const letterSeal = letterCard.querySelector('.letter-seal');
        const statusEl = letterStatuses[letterIndex];
        const icon = letterSeal ? letterSeal.querySelector('i') : null;

        if (currentTime >= giftDate) {
            // CARTA DESBLOQUEADA
            letterCard.classList.add('unlocked');

            if (letterSeal) {
                letterSeal.classList.remove('sealed');
                if (icon) {
                    // *** CAMBIO AQUÍ: Usamos 'fa-envelope-open' para un sobre abierto ***
                    icon.className = 'fas fa-envelope-open';
                }
            }

            if (statusEl) {
                statusEl.textContent = 'DESBLOQUEADA';
            }

            letterCard.style.cursor = 'pointer';

            // Eliminar evento anterior y agregar nuevo
            letterCard.removeEventListener('click', letterClickHandler);
            letterCard.addEventListener('click', letterClickHandler);
            // *** CORRECCIÓN: Guardamos el índice en el dataset ***
            letterCard.dataset.index = letterIndex;

        } else {
            // CARTA BLOQUEADA
            letterCard.classList.remove('unlocked');

            if (letterSeal) {
                letterSeal.classList.add('sealed');
                if (icon) {
                    icon.className = 'fas fa-lock';
                }
            }

            if (statusEl) {
                statusEl.textContent = 'BLOQUEADA';
            }

            letterCard.style.cursor = 'default';
            letterCard.removeEventListener('click', letterClickHandler);
            // *** CORRECCIÓN: Eliminamos el dataset ***
            delete letterCard.dataset.index;
        }
    }

    // =============================================
    // MANEJADOR DE CLIC PARA CARTAS
    // =============================================
    function letterClickHandler(event) {
        const card = event.currentTarget;
        const index = card.dataset.index;
        if (index !== undefined) {
            openLetterModal(parseInt(index));
        }
    }

    // =============================================
    // FUNCIÓN PARA ACTUALIZAR CONTADORES PEQUEÑOS
    // =============================================
    function updateSmallCountdown(letterIndex, currentTime) {
        const giftDate = giftDates[letterIndex];
        const timeDiff = giftDate.getTime() - currentTime.getTime();
        const countdownSmall = countdownsSmall[letterIndex];

        if (!countdownSmall) return;

        if (timeDiff <= 0) {
            countdownSmall.innerHTML = '00d : 00h : 00m : 00s';
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownSmall.innerHTML = `${days.toString().padStart(2, '0')}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`;
    }

    // =============================================
    // FUNCIÓN PARA ABRIR MODAL
    // =============================================
    function openLetterModal(letterIndex) {
        const giftDate = giftDates[letterIndex];
        const now = new Date();

        if (now < giftDate) {
            alert('Esta carta aún no está disponible. Por favor, espera hasta la fecha indicada.');
            return;
        }

        const letterTitles = [
            "COMUNICADO #1 - Día del Amor y la Amistad",
            "COMUNICADO #2 - Un Mes de Magia",
            "COMUNICADO #3 - Regalo de Primavera",
            "COMUNICADO #4 - La Varita de Saúco",
            "🎂 COMUNICADO ESPECIAL - ¡Feliz Cumpleaños Ximena! 🎂"
        ];

        const letterSubtitles = [
            "HOGWARTS - Departamento de Regalos Especiales",
            "HOGWARTS - Departamento de Sorpresas Continuas",
            "HOGWARTS - Departamento de Alegría Primaveral",
            "HOGWARTS - Departamento de Reliquias Mágicas",
            "HOGWARTS - Departamento de Celebraciones"
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

<div style="text-align:center; margin-top:15px;">
    <span style="color:#946b2d; font-size:0.9em; font-style:italic;">
        *Tu carta de aceptación a Ravenclaw será entregada junto con tu primer obsequio*
    </span>
</div>
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

        modalTitle.textContent = letterTitles[letterIndex];
        modalSubtitle.textContent = letterSubtitles[letterIndex];
        modalLetterContent.innerHTML = letterContents[letterIndex];
        modal.style.display = 'block';
    }

    // =============================================
    // CERRAR MODAL
    // =============================================
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // =============================================
    // INICIALIZAR CONTADOR PRINCIPAL
    // =============================================
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // =============================================
    // CONTADOR "SEGUIMOS TRABAJANDO"
    // =============================================
    const workTargetDate = new Date("2026-04-14T00:00:00").getTime();

    const wtDaysEl = document.getElementById("wt-days");
    const wtHoursEl = document.getElementById("wt-hours");
    const wtMinutesEl = document.getElementById("wt-minutes");
    const wtSecondsEl = document.getElementById("wt-seconds");

    function updateWorkTimer() {
        const now = new Date().getTime();
        const distance = workTargetDate - now;

        if (distance <= 0) {
            wtDaysEl.textContent = "00";
            wtHoursEl.textContent = "00";
            wtMinutesEl.textContent = "00";
            wtSecondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        wtDaysEl.textContent = String(days).padStart(2, "0");
        wtHoursEl.textContent = String(hours).padStart(2, "0");
        wtMinutesEl.textContent = String(minutes).padStart(2, "0");
        wtSecondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateWorkTimer();
    setInterval(updateWorkTimer, 1000);

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

    console.log("✨ Página de Hogwarts Academy cargada con magia ✨");

    // =============================================
    // CINETECA MÁGICA
    // =============================================
    const cinetecaSection = document.getElementById('cineteca-magica');
    const playMagicBtn = document.getElementById('playMagicBtn');
    const videoIframe = document.getElementById('cineteca-video');

    console.log('Cineteca Mágica cargando...');
    console.log('Sección encontrada:', cinetecaSection);
    console.log('Botón encontrado:', playMagicBtn);
    console.log('Video encontrado:', videoIframe);

    // Quitar clase hidden-magic si existe
    if (cinetecaSection && cinetecaSection.classList.contains('hidden-magic')) {
        console.log('Quitando clase hidden-magic');
        cinetecaSection.classList.remove('hidden-magic');
    }

    // Crear partículas mágicas
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.classList.add('particles');
        cinetecaSection.appendChild(particlesContainer);

        // Crear 25 partículas
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Tamaño aleatorio entre 2px y 8px
            const size = Math.random() * 6 + 2;

            // Posición inicial aleatoria
            const startX = Math.random() * 100;

            // Colores dorados y púrpuras
            const colors = [
                'rgba(240, 217, 163, 0.9)', // dorado claro
                'rgba(212, 193, 156, 0.8)', // dorado medio
                'rgba(138, 109, 59, 0.7)',  // dorado oscuro
                'rgba(103, 58, 183, 0.6)'   // púrpura mágico
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Establecer propiedades de la partícula
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

    // Función para reproducir video
    function playVideo() {
        if (!videoIframe) return;

        try {
            // Cambiar a URL con autoplay
            let videoSrc = videoIframe.src;
            if (videoSrc.indexOf('autoplay=1') === -1) {
                const separator = videoSrc.indexOf('?') !== -1 ? '&' : '?';
                videoIframe.src = videoSrc + separator + 'autoplay=1&mute=0';
            }

            // Intentar reproducir mediante API
            videoIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            console.log('Reproduciendo video...');
        } catch (error) {
            console.log('Error al reproducir video:', error);
            // Fallback: recargar el iframe
            videoIframe.src = videoIframe.src;
        }
    }

    // Efecto especial al hacer clic en el botón
    if (playMagicBtn) {
        playMagicBtn.addEventListener('click', function () {
            console.log('Iniciando proyección mágica...');

            // Reproducir el video
            playVideo();

            // Efecto visual en el botón
            const originalText = this.innerHTML;
            const originalTransform = this.style.transform;

            this.innerHTML = '🎬 Proyección Mágica...';
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '0 0 40px rgba(138, 109, 59, 0.8), 0 5px 20px rgba(0, 0, 0, 0.6)';
            this.disabled = true;

            // Efecto de chispas mágicas
            createSparkleEffect(this);

            // Restaurar el botón después de 5 segundos
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.transform = originalTransform;
                this.style.boxShadow = '';
                this.disabled = false;
            }, 5000);
        });
    }

    // Función para crear efecto de chispas mágicas
    function createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 20;

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '8px';
            sparkle.style.height = '8px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = '#f0d9a3';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10000';
            sparkle.style.boxShadow = '0 0 15px rgba(240, 217, 163, 0.8)';

            // Posición inicial en el botón
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            sparkle.style.left = `${startX}px`;
            sparkle.style.top = `${startY}px`;

            document.body.appendChild(sparkle);

            // Animación de dispersión mágica
            const angle = Math.random() * Math.PI * 2;
            const distance = 40 + Math.random() * 100;
            const duration = 400 + Math.random() * 600;

            const animation = sparkle.animate([
                {
                    transform: `translate(0, 0) scale(1)`,
                    opacity: 1,
                    boxShadow: '0 0 20px rgba(240, 217, 163, 1)'
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.2)`,
                    opacity: 0,
                    boxShadow: '0 0 5px rgba(240, 217, 163, 0.3)'
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)'
            });

            // Eliminar la chispa después de la animación
            animation.onfinish = () => {
                if (document.body.contains(sparkle)) {
                    document.body.removeChild(sparkle);
                }
            };
        }
    }

    // Crear partículas de fondo cuando la sección esté cargada
    if (cinetecaSection) {
        console.log('Creando ambiente mágico...');
        setTimeout(() => {
            createParticles();
        }, 1000);
    }

    // Cargar video cuando la sección sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Cineteca visible, precargando video...');
                // Precargar video cuando sea visible
                if (videoIframe) {
                    videoIframe.src = videoIframe.src;
                }
            }
        });
    }, { threshold: 0.1 });

    if (cinetecaSection) {
        observer.observe(cinetecaSection);
    }
});

// =============================================
// LECHUZA MENSAJERA
// =============================================
document.addEventListener('DOMContentLoaded', function () {
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
    owlMessage.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            sendMessage();
        }
    });

    // Activar modo administrador con combinación de teclas (Ctrl+Alt+M)
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.altKey && e.key === 'm') {
            activateAdminMode();
        }
    });

    // Activar modo administrador con 5 clics en la lechuza
    owl.addEventListener('click', function (e) {
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
            showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top,
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
        adminWriteBtn.onmouseenter = function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 215, 0, 0.3)';
        };
        adminWriteBtn.onmouseleave = function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        adminWriteBtn.onclick = function () {
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
        deleteAllBtn.onmouseenter = function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(255, 100, 100, 0.3)';
        };
        deleteAllBtn.onmouseleave = function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        deleteAllBtn.onclick = function () {
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
        exitAdminBtn.onmouseenter = function () {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(180, 180, 180, 0.3)';
        };
        exitAdminBtn.onmouseleave = function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        };
        exitAdminBtn.onclick = function () {
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
            showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top,
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
            showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top,
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

                deleteBtn.onmouseenter = function () {
                    this.style.opacity = '1';
                    this.style.transform = 'scale(1.1)';
                    this.style.boxShadow = '0 0 10px rgba(255, 100, 100, 0.5)';
                };

                deleteBtn.onmouseleave = function () {
                    this.style.opacity = '0.8';
                    this.style.transform = '';
                    this.style.boxShadow = '';
                };

                deleteBtn.onclick = function (e) {
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
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top,
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
        showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top,
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
    owl.addEventListener('mouseenter', function () {
        if (!isOwlFlying) {
            this.style.filter = 'sepia(0.2) brightness(1) drop-shadow(0 0 15px rgba(180, 160, 110, 0.4))';
        }
    });

    owl.addEventListener('mouseleave', function () {
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
                showOwlMessage(owlRect.left + owlRect.width / 2, owlRect.top,
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

// =============================================
// SOMBRERO SELECCIONADOR
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    const continueBtn = document.getElementById('continueBtn');
    const startBtn = document.getElementById('startSelection');
    const resetBtn = document.getElementById('resetSelection');
    const houses = document.querySelectorAll('.house-card');
    const counterNumber = document.querySelector('.counter-number');
    const selectionResult = document.getElementById('selectionResult');
    const selectorParticles = document.getElementById('selectorParticles');

    // Elementos que se mostrarán después del sombrero
    const hatIntro = document.getElementById('hatIntro');
    const selectorTitle = document.getElementById('selectorTitle');
    const selectorSubtitle = document.getElementById('selectorSubtitle');
    const housesContainer = document.getElementById('housesContainer');
    const selectionCounter = document.getElementById('selectionCounter');

    // Variables de estado
    let selectionInterval;
    let currentHouseIndex = 0;
    let counter = 0;
    const totalSelections = 10;

    // Verificar si los elementos existen antes de agregar eventos
    if (continueBtn) {
        continueBtn.addEventListener('click', showHouses);
    }

    if (startBtn) {
        startBtn.addEventListener('click', startSelectionProcess);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetSelection);
    }

    // Función para mostrar las casas después del sombrero
    function showHouses() {
        if (!hatIntro || !selectorTitle || !selectorSubtitle || !housesContainer || !selectionCounter || !startBtn || !selectionResult) return;

        // Ocultar el sombrero con animación
        hatIntro.classList.add('hidden');

        // Mostrar el resto de elementos con retrasos para un efecto escalonado
        setTimeout(() => {
            selectorTitle.classList.remove('hidden-magic');
            selectorTitle.classList.add('show-magic');
        }, 300);

        setTimeout(() => {
            selectorSubtitle.classList.remove('hidden-magic');
            selectorSubtitle.classList.add('show-magic');
        }, 600);

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

    // Función principal para iniciar la selección
    function startSelectionProcess() {
        if (!startBtn || !counterNumber || !selectionResult || !houses.length) return;

        // Resetear estado
        startBtn.disabled = true;
        startBtn.textContent = 'Seleccionando...';
        counter = 0;
        currentHouseIndex = 0;

        // Actualizar contador
        if (counterNumber) {
            counterNumber.textContent = '0';
        }

        // Resetear resultado
        selectionResult.classList.remove('final-state');
        selectionResult.classList.add('initial-state');

        // Eliminar clases activas previas de las casas
        houses.forEach(house => {
            house.classList.remove('active', 'light-up', 'winner');
        });

        // Limpiar partículas anteriores
        clearParticles();

        // Crear partículas de confeti iniciales
        createConfetti();

        // Iniciar intervalo de selección
        selectionInterval = setInterval(performSelection, 300);
    }

    // Función que se ejecuta en cada intervalo de selección
    function performSelection() {
        if (!houses.length || !counterNumber) return;

        // Remover clase activa de todas las casas
        houses.forEach(house => {
            house.classList.remove('active');
        });

        // Remover clase light-up de la casa anterior
        if (houses[currentHouseIndex]) {
            houses[currentHouseIndex].classList.remove('light-up');
        }

        // Actualizar índice circularmente
        currentHouseIndex = (currentHouseIndex + 1) % houses.length;

        // Activar casa actual
        houses[currentHouseIndex].classList.add('active', 'light-up');

        // Actualizar contador
        counter++;
        if (counterNumber) {
            counterNumber.textContent = counter;
        }

        // Efecto de partículas
        createSelectionParticle(currentHouseIndex);

        // Cuando llegue al final
        if (counter >= totalSelections) {
            clearInterval(selectionInterval);

            // Pausa dramática antes de revelar
            setTimeout(() => {
                // Mostrar Ravenclaw como ganadora
                houses.forEach(house => {
                    house.classList.remove('active', 'light-up');
                    if (house.classList.contains('ravenclaw')) {
                        house.classList.add('active', 'winner');
                    }
                });

                // Revelar la casa en el resultado
                revealHouseResult();

            }, 800);
        }
    }

    // Función para revelar la casa ganadora
    function revealHouseResult() {
        if (!selectionResult || !startBtn) return;

        // Efecto de partículas de revelación
        createRevealParticles();

        // Cambiar al estado final
        setTimeout(() => {
            selectionResult.classList.remove('initial-state');
            selectionResult.classList.add('final-state');

            // Más confeti de celebración
            createRavenclawConfetti();

            // Resetear botón de inicio
            startBtn.disabled = false;
            startBtn.textContent = 'Repetir Selección';

        }, 500);
    }

    // Función para reiniciar la selección
    function resetSelection() {
        if (!selectionResult || !startBtn || !counterNumber || !houses.length) return;

        // Resetear resultado
        selectionResult.classList.remove('final-state');
        selectionResult.classList.add('initial-state');

        // Resetear casas
        houses.forEach(house => {
            house.classList.remove('active', 'winner', 'light-up');
        });

        // Resetear contador
        if (counterNumber) {
            counterNumber.textContent = '0';
        }

        // Limpiar partículas
        clearParticles();

        // Habilitar botón de inicio
        startBtn.disabled = false;
        startBtn.textContent = 'Comenzar Selección';
    }

    // Función para crear partícula de selección
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

        // Color según la casa
        if (house.classList.contains('gryffindor')) {
            particle.style.backgroundColor = '#ae0001';
        } else if (house.classList.contains('slytherin')) {
            particle.style.backgroundColor = '#2a623d';
        } else if (house.classList.contains('hufflepuff')) {
            particle.style.backgroundColor = '#ffdb00';
        } else if (house.classList.contains('ravenclaw')) {
            particle.style.backgroundColor = '#0e1a40';
        }

        particle.style.animationDuration = '1.5s';
        selectorParticles.appendChild(particle);

        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1500);
    }

    // Función para crear partículas de revelación
    function createRevealParticles() {
        const revealParticles = document.getElementById('revealParticles');
        if (!revealParticles) return;

        const centerX = 50; // Centro horizontal (%)
        const centerY = 50; // Centro vertical (%)

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('reveal-particle');

            // Tamaño aleatorio
            const size = Math.random() * 20 + 10;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Posición inicial (centro)
            particle.style.left = `${centerX}%`;
            particle.style.top = `${centerY}%`;

            // Dirección aleatoria
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            // Animación
            particle.style.animation = `particleBurst 1s ease-out forwards`;
            particle.style.animationDelay = `${Math.random() * 0.3}s`;

            revealParticles.appendChild(particle);

            // Remover después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1300);
        }
    }

    // Función para crear confeti inicial
    function createConfetti() {
        if (!selectorParticles) return;

        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.classList.add('ravenclaw');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 1 + 's';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            selectorParticles.appendChild(confetti);

            // Remover después de la animación
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 3000);
        }
    }

    // Función para crear confeti de Ravenclaw
    function createRavenclawConfetti() {
        const selectionResult = document.getElementById('selectionResult');
        if (!selectionResult) return;

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.classList.add('ravenclaw');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            selectionResult.appendChild(confetti);

            // Remover después de la animación
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 3000);
        }
    }

    // Función para limpiar todas las partículas
    function clearParticles() {
        // Limpiar partículas del selector
        if (selectorParticles) {
            while (selectorParticles.firstChild) {
                selectorParticles.removeChild(selectorParticles.firstChild);
            }
        }

        // Limpiar partículas de revelación
        const revealParticles = document.getElementById('revealParticles');
        if (revealParticles) {
            while (revealParticles.firstChild) {
                revealParticles.removeChild(revealParticles.firstChild);
            }
        }

        // Limpiar confeti del resultado
        const confettiElements = document.querySelectorAll('.confetti');
        confettiElements.forEach(confetti => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        });
    }

    // Inicialización
    console.log('Sombrero Seleccionador cargado correctamente');
});