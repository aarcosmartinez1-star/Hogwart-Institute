// =============================================
// QUIZ DE HARRY POTTER - PREGUNTAS MÁGICAS
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // PREGUNTAS DEL QUIZ
    // =============================================
    const questions = [
        {
            text: "¿Cuál es el nombre del búho de Harry Potter?",
            options: ["Errol", "Hedwig", "Pigwidgeon", "Crookshanks"],
            correct: 1,
            explanation: "¡Correcto! Hedwig fue la lechuza nevada de Harry, un regalo de Hagrid en su cumpleaños número 11."
        },
        {
            text: "¿Qué posición juega Harry Potter en Quidditch?",
            options: ["Buscador", "Golpeador", "Guardian", "Cazador"],
            correct: 0,
            explanation: "Harry es el Buscador más joven en un siglo, ¡y también el mejor!"
        },
        {
            text: "¿Cómo se llama el elfo doméstico de la familia Malfoy?",
            options: ["Kreacher", "Winky", "Dobby", "Hokey"],
            correct: 2,
            explanation: "Dobby fue el elfo doméstico de los Malfoy antes de que Harry lo liberara."
        },
        {
            text: "¿Cuál es la reliquia que perteneció a Godric Gryffindor?",
            options: ["La Capa de Invisibilidad", "La Piedra de la Resurrección", "La Varita de Saúco", "La Espada de Gryffindor"],
            correct: 3,
            explanation: "¡La Espada de Gryffindor! Forjada por duendes y adornada con rubíes."
        },
        {
            text: "¿Cómo se llama la mascota de la casa Ravenclaw?",
            options: ["León", "Serpiente", "Tejón", "Águila"],
            correct: 3,
            explanation: "El águila representa la sabiduría y la inteligencia de Ravenclaw."
        },
        {
            text: "¿Qué hechizo se usa para desarmar a un oponente?",
            options: ["Expecto Patronum", "Avada Kedavra", "Expelliarmus", "Lumos"],
            correct: 2,
            explanation: "¡Expelliarmus! El hechizo característico de Harry Potter."
        },
        {
            text: "¿Cómo se llama la madre de Draco Malfoy?",
            options: ["Bellatrix Lestrange", "Narcissa Malfoy", "Andromeda Tonks", "Nymphadora Tonks"],
            correct: 1,
            explanation: "Narcissa Malfoy (nacida Black), esposa de Lucius Malfoy."
        },
        {
            text: "¿Qué criatura guarda la Cámara de los Secretos?",
            options: ["Un Basilisco", "Un Acromántula", "Un Hipogrifo", "Un Dragón"],
            correct: 0,
            explanation: "¡Un Basilisco! Una serpiente gigante que mata con la mirada."
        },
        {
            text: "¿En qué calle se encuentra El Caldero Chorreante?",
            options: ["Callejón Diagon", "Callejón Knockturn", "Charing Cross Road", "Privet Drive"],
            correct: 2,
            explanation: "El Caldero Chorreante está en Charing Cross Road, Londres."
        },
        {
            text: "¿Cuál es el patronus de Hermione Granger?",
            options: ["Nutria", "Lobo", "Ciervo", "Gato"],
            correct: 0,
            explanation: "¡Una nutria! El patronus de Hermione es una nutria, que representa su curiosidad."
        }
    ];
    
    // =============================================
    // ELEMENTOS DEL DOM
    // =============================================
    const quizStart = document.getElementById('quizStart');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizResult = document.getElementById('quizResult');
    const startBtn = document.getElementById('startQuizBtn');
    const restartBtn = document.getElementById('restartQuizBtn');
    const questionText = document.getElementById('questionText');
    const quizOptions = document.getElementById('quizOptions');
    const quizScoreSpan = document.getElementById('quizScore');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const quizFeedback = document.getElementById('quizFeedback');
    const finalScoreSpan = document.getElementById('finalScore');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const resultBadge = document.getElementById('resultBadge');
    
    // =============================================
    // VARIABLES DE ESTADO
    // =============================================
    let currentQuestionIndex = 0;
    let score = 0;
    let quizActive = false;
    let selectedOption = false;
    
    // =============================================
    // INICIALIZAR QUIZ
    // =============================================
    totalQuestionsSpan.textContent = questions.length;
    
    // Eventos
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    
    // =============================================
    // FUNCIÓN: COMENZAR QUIZ
    // =============================================
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizActive = true;
        selectedOption = false;
        
        // Actualizar puntuación
        if (quizScoreSpan) quizScoreSpan.textContent = score;
        
        // Cambiar pantallas
        if (quizStart) quizStart.classList.add('hidden-magic');
        if (quizQuestion) quizQuestion.classList.remove('hidden-magic');
        if (quizResult) quizResult.classList.add('hidden-magic');
        
        // Cargar primera pregunta
        loadQuestion();
        
        // Efecto de sonido (opcional)
        playSound('start');
    }
    
    // =============================================
    // FUNCIÓN: CARGAR PREGUNTA
    // =============================================
    function loadQuestion() {
        if (!quizActive) return;
        
        selectedOption = false;
        if (quizFeedback) quizFeedback.classList.add('hidden-magic');
        
        const question = questions[currentQuestionIndex];
        if (!question) return;
        
        // Actualizar texto de la pregunta
        if (questionText) questionText.textContent = question.text;
        
        // Actualizar progreso
        if (currentQuestionSpan) currentQuestionSpan.textContent = currentQuestionIndex + 1;
        
        // Generar opciones
        if (quizOptions) {
            quizOptions.innerHTML = '';
            const letters = ['A', 'B', 'C', 'D'];
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.innerHTML = `
                    <span class="quiz-option-prefix">${letters[index]}</span>
                    <span class="quiz-option-text">${option}</span>
                `;
                optionDiv.addEventListener('click', () => selectOption(index));
                quizOptions.appendChild(optionDiv);
            });
        }
        
        // Animación de entrada
        if (quizQuestion) {
            quizQuestion.style.animation = 'none';
            setTimeout(() => {
                if (quizQuestion) quizQuestion.style.animation = 'slideIn 0.5s ease-out';
            }, 10);
        }
    }
    
    // =============================================
    // FUNCIÓN: SELECCIONAR OPCIÓN
    // =============================================
    function selectOption(selectedIndex) {
        if (!quizActive || selectedOption) return;
        
        selectedOption = true;
        const question = questions[currentQuestionIndex];
        const isCorrect = selectedIndex === question.correct;
        const selectedOptionDiv = quizOptions.children[selectedIndex];
        const correctOptionDiv = quizOptions.children[question.correct];
        
        // Marcar opción correcta e incorrecta
        if (isCorrect) {
            score += 10;
            if (quizScoreSpan) quizScoreSpan.textContent = score;
            selectedOptionDiv.classList.add('correct');
            showFeedback(true, question.explanation);
            playSound('correct');
            crearEfectoConfettiPequeño();
        } else {
            selectedOptionDiv.classList.add('wrong');
            correctOptionDiv.classList.add('correct');
            showFeedback(false, question.explanation);
            playSound('wrong');
        }
        
        // Deshabilitar todas las opciones
        for (let i = 0; i < quizOptions.children.length; i++) {
            quizOptions.children[i].style.pointerEvents = 'none';
        }
        
        // Pasar a la siguiente pregunta después de 2 segundos
        setTimeout(() => {
            if (currentQuestionIndex + 1 < questions.length) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                endQuiz();
            }
        }, 2000);
    }
    
    // =============================================
    // FUNCIÓN: MOSTRAR FEEDBACK
    // =============================================
    function showFeedback(isCorrect, explanation) {
        if (!quizFeedback) return;
        
        quizFeedback.classList.remove('hidden-magic');
        quizFeedback.classList.remove('correct-feedback', 'wrong-feedback');
        quizFeedback.classList.add(isCorrect ? 'correct-feedback' : 'wrong-feedback');
        
        const icon = isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto';
        quizFeedback.innerHTML = `<strong>${icon}</strong><br>${explanation}`;
    }
    
    // =============================================
    // FUNCIÓN: FINALIZAR QUIZ
    // =============================================
    function endQuiz() {
        quizActive = false;
        
        if (quizQuestion) quizQuestion.classList.add('hidden-magic');
        if (quizResult) quizResult.classList.remove('hidden-magic');
        
        if (finalScoreSpan) finalScoreSpan.textContent = score;
        
        // Determinar resultado según puntuación
        let message = '';
        let badge = '';
        let icon = '';
        
        if (score === 100) {
            message = '¡Perfecto! Eres un verdadero mago. Dumbledore estaría orgulloso de ti.';
            badge = '🏆 ¡SABIDURÍA DE RAVENCLAW! 🏆';
            icon = '🦅';
        } else if (score >= 80) {
            message = '¡Excelente! Tienes un gran conocimiento del mundo mágico.';
            badge = '📜 ¡MAGO DISTINGUIDO! 📜';
            icon = '⭐';
        } else if (score >= 60) {
            message = '¡Bien hecho! Sigue practicando y serás un experto.';
            badge = '🪄 ¡APRENDIZ DE HOGWARTS! 🪄';
            icon = '📚';
        } else if (score >= 40) {
            message = 'No está mal. Te recomendamos leer más en la Biblioteca Prohibida.';
            badge = '🔮 ¡NECESITAS ESTUDIAR! 🔮';
            icon = '📖';
        } else {
            message = 'Has sido transferido a Howarts... ¡como espectro! Necesitas más práctica mágica.';
            badge = '👻 ¡ESPECTRO DE HOGWARTS! 👻';
            icon = '🕯️';
        }
        
        if (resultMessage) resultMessage.textContent = message;
        if (resultBadge) resultBadge.innerHTML = `<span style="font-size: 1.5rem;">${icon}</span> ${badge}`;
        if (resultTitle) {
            if (score === 100) resultTitle.textContent = '¡Sabiduría Suprema!';
            else if (score >= 80) resultTitle.textContent = '¡Gran Mago!';
            else if (score >= 60) resultTitle.textContent = '¡Buen Trabajo!';
            else resultTitle.textContent = '¡Sigue Intentando!';
        }
        
        // Efecto de confetti según puntuación
        if (score >= 80) {
            lanzarConfettiCelebracion();
        } else if (score === 100) {
            lanzarConfettiEspecial();
        }
        
        playSound('end');
    }
    
    // =============================================
    // FUNCIÓN: REINICIAR QUIZ
    // =============================================
    function restartQuiz() {
        if (quizStart) quizStart.classList.remove('hidden-magic');
        if (quizQuestion) quizQuestion.classList.add('hidden-magic');
        if (quizResult) quizResult.classList.add('hidden-magic');
        
        currentQuestionIndex = 0;
        score = 0;
        quizActive = false;
        selectedOption = false;
        
        if (quizScoreSpan) quizScoreSpan.textContent = '0';
    }
    
    // =============================================
    // FUNCIÓN: REPRODUCIR SONIDO
    // =============================================
    function playSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'correct') {
                oscillator.frequency.value = 880;
                gainNode.gain.value = 0.2;
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
                oscillator.stop(audioContext.currentTime + 0.5);
            } else if (type === 'wrong') {
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.2;
                oscillator.start();
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
                oscillator.stop(audioContext.currentTime + 0.5);
            }
        } catch(e) {
            console.log('Audio no disponible');
        }
    }
    
    // =============================================
    // EFECTOS DE CONFETTI
    // =============================================
    function crearEfectoConfettiPequeño() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 30,
                spread: 45,
                origin: { y: 0.8 },
                colors: ['#f0d9a3', '#ffd700', '#ff6b35'],
                startVelocity: 15
            });
        }
    }
    
    function lanzarConfettiCelebracion() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f0d9a3', '#ffd700', '#8a6d3b', '#0e1a40'],
                startVelocity: 25
            });
            
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.5 },
                    startVelocity: 20
                });
            }, 300);
        }
    }
    
    function lanzarConfettiEspecial() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.5 },
                colors: ['#f0d9a3', '#ffd700', '#ff6b35', '#8a6d3b', '#0e1a40', '#ae0001', '#2a623d'],
                startVelocity: 30
            });
            
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 }
                });
            }, 200);
            
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 }
                });
            }, 400);
        }
    }
    
    console.log("📚 Quiz de Harry Potter cargado correctamente");
});