// Script para efectos mágicos en la Cineteca
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cineteca Mágica cargando...');
    
    const cinetecaSection = document.getElementById('cineteca-magica');
    const playMagicBtn = document.getElementById('playMagicBtn');
    const videoIframe = document.getElementById('cineteca-video');
    
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
        playMagicBtn.addEventListener('click', function() {
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
    
    console.log('✨ Cineteca Mágica lista!');
});
// cineteca.js
const cineteca = document.querySelector('.hidden-magic');

window.addEventListener('scroll', () => {
    const top = cineteca.getBoundingClientRect().top;
    const height = window.innerHeight;

    if (top < height - 100) {
        cineteca.classList.add('show');
    }
});
