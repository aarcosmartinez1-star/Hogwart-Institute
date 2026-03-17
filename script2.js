document.addEventListener('DOMContentLoaded', function() {
    // Fecha de inicio (14 de Agosto 2025)
    const FECHA_INICIO = new Date(2025, 7, 14);
    
    // Elementos del DOM
    const diasJuntosEl = document.getElementById('diasJuntos');
    const momentosEspecialesEl = document.getElementById('momentosEspeciales');
    const proximaFechaEl = document.getElementById('proximaFechaEspecial');
    const diasAniversarioEl = document.getElementById('diasAniversario');
    const diasSanValentinEl = document.getElementById('diasSanValentin');
    const diasBodaEl = document.getElementById('diasBoda');
    
    // Calcular días desde el inicio
    function calcularDiasJuntos() {
        const hoy = new Date();
        const diferencia = hoy - FECHA_INICIO;
        return Math.floor(diferencia / (1000 * 60 * 60 * 24));
    }
    
    // Calcular días para próxima fecha especial
    function calcularProximosEventos() {
        const hoy = new Date();
        const añoActual = hoy.getFullYear();
        
        // Fechas especiales
        const eventos = [
            { 
                nombre: 'Aniversario', 
                mes: 7, 
                dia: 14,
                elemento: diasAniversarioEl,
                textoPasado: 'Hace {dias} días',
                textoFuturo: 'En {dias} días'
            },
            { 
                nombre: 'San Valentín', 
                mes: 1, 
                dia: 14,
                elemento: diasSanValentinEl,
                textoPasado: 'Hace {dias} días',
                textoFuturo: 'En {dias} días'
            },
            { 
                nombre: 'Cumpleaños de Ximenita', 
                mes: 4, 
                dia: 19,
                elemento: diasBodaEl,
                textoPasado: 'Hace {dias} días',
                textoFuturo: 'En {dias} días'
            }
        ];
        
        let proximoEvento = null;
        let diasMinimos = Infinity;
        
        eventos.forEach(evento => {
            const fechaEvento = new Date(añoActual, evento.mes, evento.dia);
            
            if (fechaEvento < hoy) {
                fechaEvento.setFullYear(añoActual + 1);
            }
            
            const diasRestantes = Math.ceil((fechaEvento - hoy) / (1000 * 60 * 60 * 24));
            
            if (diasRestantes < diasMinimos) {
                diasMinimos = diasRestantes;
                proximoEvento = {
                    nombre: evento.nombre,
                    fecha: fechaEvento,
                    dias: diasRestantes
                };
            }
            
            // Actualizar cada tarjeta
            if (evento.elemento) {
                const fechaEventoActual = new Date(añoActual, evento.mes, evento.dia);
                let diferenciaDias;
                let texto;
                
                if (fechaEventoActual < hoy) {
                    // Evento ya pasó este año
                    diferenciaDias = Math.floor((hoy - fechaEventoActual) / (1000 * 60 * 60 * 24));
                    texto = evento.textoPasado.replace('{dias}', diferenciaDias);
                } else {
                    // Evento futuro
                    diferenciaDias = Math.ceil((fechaEventoActual - hoy) / (1000 * 60 * 60 * 24));
                    texto = evento.textoFuturo.replace('{dias}', diferenciaDias);
                }
                
                evento.elemento.textContent = texto;
            }
        });
        
        // Actualizar próxima fecha especial
        if (proximoEvento && proximaFechaEl) {
            const opciones = { day: 'numeric', month: 'long' };
            proximaFechaEl.textContent = `✨ ${proximoEvento.nombre}: ${proximoEvento.fecha.toLocaleDateString('es-ES', opciones)} (en ${proximoEvento.dias} días)`;
        }
    }
    
    // Actualizar todo
    function actualizarTodo() {
        // Días juntos
        if (diasJuntosEl) {
            diasJuntosEl.textContent = calcularDiasJuntos();
        }
        
        // Momentos especiales (contar del álbum)
        if (momentosEspecialesEl) {
            const recuerdos = document.querySelectorAll('[class*="recuerdo"], .album-recuerdos > div, .recuerdo-card');
            momentosEspecialesEl.textContent = recuerdos.length || 15;
        }
        
        // Próximos eventos
        calcularProximosEventos();
    }
    
    // Efectos interactivos
    function agregarEfectos() {
        // Click en el Fénix
        const fenixImg = document.querySelector('.fenix-img');
        if (fenixImg) {
            fenixImg.addEventListener('click', function() {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        crearLlama();
                    }, i * 100);
                }
            });
        }
        
        // Hover en contadores
        const counterBoxes = document.querySelectorAll('.counter-box');
        counterBoxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            box.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Crear llama decorativa
    function crearLlama() {
        const llama = document.createElement('div');
        llama.innerHTML = '🔥';
        llama.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${20 + Math.random() * 30}px;
            pointer-events: none;
            z-index: 9999;
            animation: subirLlama 1.5s forwards;
            filter: drop-shadow(0 0 10px #ff6b35);
        `;
        document.body.appendChild(llama);
        
        setTimeout(() => llama.remove(), 1500);
    }
    
    // Añadir animación CSS para llamas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes subirLlama {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) rotate(20deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar
    actualizarTodo();
    agregarEfectos();
    
    // Actualizar cada minuto
    setInterval(actualizarTodo, 60000);
});