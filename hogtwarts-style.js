// =============================================
// VARITA MÁGICA PRO - ESTELAS + CLICK
// =============================================

(function () {

    const VARITA_PNG = 'img/varita.png';
    const TAMANO = 40;

    const cursor = document.createElement('img');
    cursor.src = VARITA_PNG;

    cursor.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        width: ${TAMANO}px;
        height: ${TAMANO}px;
        transform: translate(-20px, -20px);
        object-fit: contain;
        filter: drop-shadow(0 0 10px gold);
    `;

    document.body.appendChild(cursor);

    // Ocultar cursor real
    document.body.style.cursor = 'none';

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        crearEstela(e.clientX, e.clientY);
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.25;
        currentY += (mouseY - currentY) * 0.25;

        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    // ✨ ESTELA MÁGICA
    function crearEstela(x, y) {
        const trail = document.createElement('div');

        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 99998;
            background: radial-gradient(circle, gold, transparent);
            animation: fadeTrail 0.6s linear forwards;
        `;

        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 600);
    }

    // CLICK ✨
    document.addEventListener('click', (e) => {

        cursor.style.transform = 'translate(-20px, -20px) scale(0.7)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-20px, -20px) scale(1)';
        }, 100);

        for (let i = 0; i < 8; i++) {
            crearChispa(e.clientX, e.clientY);
        }
    });

    function crearChispa(x, y) {
        const spark = document.createElement('div');

        spark.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 14px;
            pointer-events: none;
            z-index: 99998;
            animation: sparkle 0.8s ease-out forwards;
        `;

        spark.innerHTML = '✨';

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), 800);
    }

    // CSS dinámico
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeTrail {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0.2);
            }
        }

        @keyframes sparkle {
            0% {
                opacity: 1;
                transform: scale(0.5);
            }
            100% {
                opacity: 0;
                transform: translateY(-20px) scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);

    console.log("🪄 Varita PRO activada");

})();