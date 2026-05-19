/* CARGA DE SECCIONES  */
async function cargarSeccion(nombre) {
    const contenedor = document.getElementById("contenido");
    contenedor.style.opacity = "0";
    try {
        const res = await fetch(`secciones/${nombre}.html`);
        if (!res.ok) throw new Error("Error al cargar sección");
        const html = await res.text();
        contenedor.innerHTML = html;
        setTimeout(() => { contenedor.style.opacity = "1"; }, 60);
    } catch (error) {
        contenedor.innerHTML = "<p style='color:#64748b;padding:40px;text-align:center;'>Error al cargar la sección.</p>";
        contenedor.style.opacity = "1";
    }
}

/* === INIT === */
window.onload = () => {
    const contenedor = document.getElementById("contenido");
    contenedor.style.transition = "opacity 0.3s ease";
    cargarSeccion("inicio");
};

/* === CUESTIONARIO === */
function evaluarQuiz() {
    let correctas = 0;
    const total = 3;
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    if (q1 && q1.value === "correcto") correctas++;
    if (q2 && q2.value === "correcto") correctas++;
    if (q3 && q3.value === "correcto") correctas++;
    const porcentaje = Math.round((correctas / total) * 100);
    document.getElementById("resultadoQuiz").textContent =
        "Resultado: " + porcentaje + "% (" + correctas + "/" + total + ")";
}

/* === CHATBOT === */
function toggleChat() {
    const body = document.getElementById("chat-body");
    body.style.display = body.style.display === "flex" ? "none" : "flex";
}

function enviarMensaje() {
    const input = document.getElementById("chat-input");
    const msg = input.value.trim().toLowerCase();
    if (!msg) return;
    agregar("Tú: " + msg);
    input.value = "";
    let resp = "No entiendo tu pregunta. Intenta con términos como: hola, cama, no enciende.";
    if (msg.includes("hola"))             resp = "Hola 👋 ¿en qué te ayudo?";
    else if (msg.includes("cama"))        resp = "Revisa que la cama caliente esté bien nivelada.";
    else if (msg.includes("no enciende")) resp = "Verifica la fuente de poder y las conexiones.";
     else if (msg.includes("asesor")) resp = "En un momento lo comunicamos con un empleado ";
    setTimeout(() => agregar("Bot: " + resp), 400);
}

function agregar(texto) {
    const chat = document.getElementById("chat-mensajes");
    const div = document.createElement("div");
    div.textContent = texto;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}