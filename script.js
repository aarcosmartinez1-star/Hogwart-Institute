document.addEventListener('DOMContentLoaded', function () {

    // Fecha actual simulada (puedes quitarla para usar la fecha real)
    const currentDate = new Date(2026, 0, 8); // 8 de enero de 2026

    // Fecha objetivo principal (cumpleaños)
    const targetDate = new Date(2026, 4, 19); // 19 de mayo de 2026

    // Fechas de desbloqueo de cartas
    const giftDates = [
        new Date(2026, 1, 14), // Carta 1 → 14 febrero
        new Date(2026, 2, 14), // Carta 2 → 14 marzo
        new Date(2026, 3, 14), // Carta 3 → 14 abril
        new Date(2026, 4, 14), // Carta 4 → 14 mayo (Varita de Saúco)
        new Date(2026, 4, 19)  // Carta 5 → 19 mayo (Cumpleaños)
    ];




    // Elementos del DOM
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

    // Cambiar fondo
    const bgSelect = document.getElementById('bg-select');

    // Mostrar fecha actual
    currentDateEl.textContent = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Funciones de fondo
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
            image: "url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        },
        {
            name: "Estrellas Nocturnas",
            image: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')"
        },
        {
            name: "Pergamino Antiguo",
            image: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80')"
        }
    ];

    // Cambiar fondo
    bgSelect.addEventListener('change', function () {
        const selectedBg = backgrounds[this.value - 1];
        document.body.style.backgroundImage = selectedBg.image;
    });

    // Contador principal
    function updateCountdown() {
        const now = new Date();
        const timeDiff = targetDate.getTime() - now.getTime();

        if (timeDiff <= 0) {
            // Ya llegó la fecha
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            countdownText.textContent = '¡Es hoy! ¡Feliz Cumpleaños!';

            // Desbloquear la carta 4 si aún no está desbloqueada
            checkAndUnlockLetter(3, now);
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

        // Actualizar texto descriptivo
        countdownText.textContent = `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;

        // Verificar y actualizar cartas
        for (let i = 0; i < giftDates.length; i++) {
            checkAndUnlockLetter(i, now);
            updateSmallCountdown(i, now);
        }
    }

    // Verificar si una carta debe desbloquearse
    function checkAndUnlockLetter(letterIndex, currentTime) {
        const giftDate = giftDates[letterIndex];
        const letterCard = letterCards[letterIndex];
        const letterSeal = letterCard.querySelector('.letter-seal');
        const statusEl = letterStatuses[letterIndex];

        if (currentTime >= giftDate) {
            // Desbloquear carta
            letterCard.classList.add('unlocked');
            letterSeal.classList.remove('sealed');
            statusEl.textContent = 'DESBLOQUEADA';
            statusEl.style.color = '#3c763d';

            // Cambiar cursor y agregar evento de clic
            letterCard.style.cursor = 'pointer';
            letterCard.addEventListener('click', function () {
                openLetterModal(letterIndex);
            });
        } else {
            // Bloquear carta
            letterCard.classList.remove('unlocked');
            letterSeal.classList.add('sealed');
            statusEl.textContent = 'BLOQUEADA';
            statusEl.style.color = '#a94442';
            letterCard.style.cursor = 'default';
        }
    }

    // Actualizar contadores pequeños de cada carta
    function updateSmallCountdown(letterIndex, currentTime) {
        const giftDate = giftDates[letterIndex];
        const timeDiff = giftDate.getTime() - currentTime.getTime();
        const countdownSmall = countdownsSmall[letterIndex];

        if (timeDiff <= 0) {
            countdownSmall.innerHTML = '<span class="small-days">00</span>d : <span class="small-hours">00</span>h : <span class="small-minutes">00</span>m : <span class="small-seconds">00</span>s';
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        countdownSmall.innerHTML = `
            <span class="small-days">${days.toString().padStart(2, '0')}</span>d : 
            <span class="small-hours">${hours.toString().padStart(2, '0')}</span>h : 
            <span class="small-minutes">${minutes.toString().padStart(2, '0')}</span>m : 
            <span class="small-seconds">${seconds.toString().padStart(2, '0')}</span>s
        `;
    }

    // Abrir modal con contenido de la carta
    function openLetterModal(letterIndex) {
        const giftDate = giftDates[letterIndex];
        const now = new Date();

        if (now < giftDate) {
            alert('Esta carta aún no está disponible. Por favor, espera hasta la fecha indicada.');
            return;
        }

        const letterTitles = [
            "Carta de Aceptación #1 - Día del Amor y la Amistad",
            "Carta de Aceptación #2 - Un Mes de Magia",
            "Carta de Aceptación #3 - Regalo de Primavera",
            "Carta de Aceptación Especial"
        ];

        const letterSubtitles = [
            "Howard Institute - Departamento de Regalos Especiales",
            "Howard Institute - Departamento de Sorpresas Continuas",
            "Howard Institute - Departamento de Alegría Primaveral",
            "Howard Institute - Departamento de Celebración y Magia",
            "Howard Institute - Departamento de Sorpresas Continuas"
        ];

        const letterContents = [

            /* ===================== CARTA 1 – 14 FEBRERO ===================== */
            `
<h3>¡Feliz Día del Amor y la Amistad!</h3>

<p>
El Consejo Académico del
<strong>Howard Institute – Instituto de Magia y Ciencias</strong>
se complace en informarte que has sido oficialmente aceptada
en el programa especial:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
“El Arte de Amar y Ser Amado”
</p>

<p>
Este selecto programa está reservado únicamente para quienes
poseen una magia excepcional en el corazón y la capacidad
de amar de forma genuina y profunda.
</p>

<p>
Como símbolo de tu ingreso, se autoriza la entrega de tu
<strong>primer obsequio</strong>, marcando el inicio de una serie
de celebraciones guiadas por las antiguas tradiciones del Instituto.
</p>

<p>
Recuerda siempre: la magia más poderosa no se aprende en libros,
sino que nace del amor verdadero.
</p>

<p style="margin-top:20px;">
Atentamente,<br>
🪄 <strong>Rectorado del Howard Institute</strong>
</p>
`,

            /* ===================== CARTA 2 – 14 MARZO ===================== */
            `
<h3>Comunicado Académico Oficial</h3>

<p>
El <strong>Howard Institute – Instituto de Magia y Ciencias</strong>
confirma tu permanencia y desempeño sobresaliente dentro del programa:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
“Magia Mensual de Sorpresas”
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
🪄 <strong>Rectorado del Howard Institute</strong>
</p>
`,

            /* ===================== CARTA 3 – 14 ABRIL ===================== */
            `
<h3>Notificación Estacional del Instituto</h3>

<p>
Con la llegada de la primavera, el
<strong>Howard Institute – Instituto de Magia y Ciencias</strong>
anuncia tu aceptación dentro del programa:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
“Alegría Floreciente de Primavera”
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
🪄 <strong>Rectorado del Howard Institute</strong>
</p>
`,

            /* ===================== CARTA 4 – 14 MAYO (VARITA DE SAÚCO) ===================== */
            `
<h3>Decreto Supremo del Consejo del Instituto</h3>

<p>
En una sesión solemne, el
<strong>Howard Institute – Instituto de Magia y Ciencias</strong>
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
🪄 Consejo Supremo del Howard Institute
</p>
`,

            /* ===================== CARTA 5 – 19 MAYO (CUMPLEAÑOS) ===================== */
            `
<h3>Celebración Oficial del Instituto</h3>

<p>
Hoy, el
<strong>Howard Institute – Instituto de Magia y Ciencias</strong>
detiene sus actividades para celebrar una fecha extraordinaria:
</p>

<p style="text-align:center; font-weight:bold; font-size:1.1em;">
Tu cumpleaños
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
🪄 Howard Institute<br>
Instituto de Magia y Ciencias
</p>
`
        ];


        modalTitle.textContent = letterTitles[letterIndex];
        modalSubtitle.textContent = letterSubtitles[letterIndex];
        modalLetterContent.innerHTML = letterContents[letterIndex];
        modal.style.display = 'block';
    }

    // Cerrar modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Inicializar contadores
    updateCountdown();

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);

    // Mostrar mensaje de bienvenida
    console.log("¡Página de sorpresa de Howard cargada!");
    console.log("Fecha objetivo: 19 de marzo de 2026");
    console.log("Cartas de regalo en: 14/feb, 14/mar, 14/abr y 19/mar");
});