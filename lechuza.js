// ===============================
// PERMISO PARA NOTIFICACIONES
// ===============================
if ("Notification" in window) {
    Notification.requestPermission();
}

// ===============================
// BOTÓN NORMAL (MENSAJE DEL USUARIO)
// ===============================
document.getElementById("sendOwlBtn").addEventListener("click", sendOwlMessage);

function sendOwlMessage() {
    const message = document.getElementById("owlMessage").value;
    const owl = document.getElementById("owl");
    const board = document.getElementById("messageBoard");

    if (message.trim() === "") {
        alert("La lechuza necesita un mensaje mágico 🦉✨");
        return;
    }

    // Animación de vuelo
    owl.classList.add("owl-fly");

    setTimeout(() => {
        owl.classList.remove("owl-fly");

        // Crear tarjeta de mensaje
        const msg = document.createElement("div");
        msg.className = "message-card";
        msg.innerHTML = `
            <p>${message}</p>
            <small>${new Date().toLocaleString()}</small>
        `;
        board.prepend(msg);

        // Limpiar textarea
        document.getElementById("owlMessage").value = "";

        // Notificación del navegador
        if (Notification.permission === "granted") {
            new Notification("🦉 Nueva Lechuza Mensajera", {
                body: message,
                icon: "img/LECHUZA/owl.png"
            });
        }
    }, 2800);
}

// ==================================================
// 🪄 MODO PROGRAMADOR – MENSAJES DESDE EL CÓDIGO
// ==================================================
function sendProgrammerMessage(text) {
    const owl = document.getElementById("owl");
    const board = document.getElementById("messageBoard");

    owl.classList.add("owl-fly");

    setTimeout(() => {
        owl.classList.remove("owl-fly");

        const msg = document.createElement("div");
        msg.className = "message-card";
        msg.innerHTML = `
            <p><strong>🪄 Mensaje del Consejo Mágico:</strong></p>
            <p>${text}</p>
            <small>${new Date().toLocaleString()}</small>
        `;
        board.prepend(msg);

        if (Notification.permission === "granted") {
            new Notification("🦉 Mensaje del Consejo Mágico", {
                body: text,
                icon: "img/LECHUZA/owl.png"
            });
        }
    }, 2800);
}

// ==================================================
// ✨ EJEMPLOS DE USO AUTOMÁTICO (PUEDES BORRAR O CAMBIAR)
// ==================================================

// Mensaje al cargar la página
window.addEventListener("load", () => {
    sendProgrammerMessage("Bienvenida Ximena, la magia de hoy comienza contigo 🦉✨");
   
});

// Mensaje por fecha especial (ejemplo cumpleaños 19 de Mayo)
function checkSpecialDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    if (day === 27 && month === 1) {
        sendProgrammerMessage("✨ Ximena, mañana tienes una cita especial escrita por la magia. " +
            "Prepárate para un momento donde el tiempo se detendrá solo para ti 🦉💫");
    }
    if (day === 27 && month === 1) {
        sendProgrammerMessage("✨ Buenas Noches Muñequitaaaaa");
    }
    if (day === 19 && month === 5) {
        sendProgrammerMessage("🎂 Feliz cumpleaños Ximena, Hogwarts celebra tu magia hoy y siempre ✨🩷");
    }
}

checkSpecialDate();
