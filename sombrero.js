document.addEventListener('DOMContentLoaded', function() {
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
    
    // Event Listeners
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
        const house = houses[houseIndex];
        const rect = house.getBoundingClientRect();
        const selectorRect = document.querySelector('.selector-section').getBoundingClientRect();
        
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