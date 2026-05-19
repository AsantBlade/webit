let paso = 0;
let headAnim = null;
let buildAnim = null;

function setStep(n) {
    for (let i = 0; i <= 3; i++) {
        document.getElementById("step-" + i).classList.toggle("active", i <= n);
    }
    for (let i = 0; i <= 2; i++) {
        const line = document.getElementById("line-" + i);
        if (line) line.classList.toggle("active", i < n);
    }
}

function limpiarError() {
    document.getElementById("sim-error").textContent = "";
}

function mostrarError(msg) {
    const el = document.getElementById("sim-error");
    el.textContent = "⚠ " + msg;
    setTimeout(() => { el.textContent = ""; }, 2500);
}

function encender() {
    if (paso >= 1) return mostrarError("La impresora ya está encendida.");
    paso = 1;
    limpiarError();

    document.getElementById("screen").setAttribute("fill", "#0d2137");
    document.getElementById("screen-text").setAttribute("fill", "#38bdf8");
    document.getElementById("screen-text").textContent = "READY";
    document.getElementById("led").setAttribute("fill", "#38bdf8");
    document.getElementById("power-btn").setAttribute("fill", "#0d2137");
    document.getElementById("power-icon").setAttribute("fill", "#38bdf8");

    document.getElementById("estado").textContent = "Estado: Encendida";
    document.getElementById("estado").style.color = "#22d3ee";

    document.getElementById("sim-panel").className = "info-box sim-container estado-encendida";
    setStep(1);
}

function calentar() {
    if (paso < 1) return mostrarError("Primero enciende la impresora.");
    if (paso >= 2) return mostrarError("Ya está en proceso de calentamiento.");
    paso = 2;
    limpiarError();

    document.getElementById("led").setAttribute("fill", "#f59e0b");
    document.getElementById("screen-text").textContent = "HEAT...";
    document.getElementById("screen-text").setAttribute("fill", "#f59e0b");
    document.getElementById("bed").setAttribute("stroke", "#f59e0b");

    document.getElementById("estado").textContent = "Estado: Calentando";
    document.getElementById("estado").style.color = "#f59e0b";

    document.getElementById("sim-panel").className = "info-box sim-container estado-calentando";

    let w = 0;
    const bar = document.getElementById("heat-bar");
    const interval = setInterval(() => {
        w += 2;
        bar.setAttribute("width", w);
        if (w >= 160) clearInterval(interval);
    }, 25);

    setStep(2);
}

function imprimir() {
    if (paso < 2) return mostrarError("Falta calentar primero.");
    if (paso >= 3) return mostrarError("Ya se está imprimiendo.");
    paso = 3;
    limpiarError();

    document.getElementById("led").setAttribute("fill", "#4ade80");
    document.getElementById("screen-text").textContent = "PRINT";
    document.getElementById("screen-text").setAttribute("fill", "#4ade80");

    document.getElementById("estado").textContent = "Estado: Imprimiendo";
    document.getElementById("estado").style.color = "#4ade80";

    document.getElementById("sim-panel").className = "info-box sim-container estado-imprimiendo";

    const head     = document.getElementById("head");
    const nozzle   = document.getElementById("nozzle");
    const filamento = document.getElementById("filamento");
    const objeto   = document.getElementById("objeto");

    let x = 100;
    let dir = 1;
    let altura = 0;

    headAnim = setInterval(() => {
        x += 1.5 * dir;
        if (x >= 198) dir = -1;
        if (x <= 32)  dir = 1;
        const cx = x + 15;
        head.setAttribute("x", x);
        nozzle.setAttribute("points", `${cx},68 ${cx - 5},78 ${cx + 5},78`);
        filamento.setAttribute("x1", cx);
        filamento.setAttribute("x2", cx);
    }, 18);

    buildAnim = setInterval(() => {
        if (altura >= 28) { clearInterval(buildAnim); return; }
        altura += 0.4;
        objeto.setAttribute("height", altura);
        objeto.setAttribute("y", 100 - altura);
        objeto.setAttribute("x", 80);
        objeto.setAttribute("width", 80);
        filamento.setAttribute("y1", "78");
        filamento.setAttribute("y2", String(100 - altura));
    }, 30);

    setStep(3);
}

function resetSim() {
    paso = 0;
    clearInterval(headAnim);
    clearInterval(buildAnim);
    limpiarError();

    document.getElementById("screen").setAttribute("fill", "#0a0f1e");
    document.getElementById("screen-text").setAttribute("fill", "#475569");
    document.getElementById("screen-text").textContent = "OFFLINE";
    document.getElementById("led").setAttribute("fill", "#1e293b");
    document.getElementById("power-btn").setAttribute("fill", "#111c30");
    document.getElementById("power-icon").setAttribute("fill", "#475569");
    document.getElementById("bed").setAttribute("stroke", "#1e3a5f");
    document.getElementById("heat-bar").setAttribute("width", "0");
    document.getElementById("head").setAttribute("x", "100");
    document.getElementById("nozzle").setAttribute("points", "115,68 110,78 120,78");
    document.getElementById("objeto").setAttribute("height", "0");
    document.getElementById("objeto").setAttribute("width", "0");
    document.getElementById("filamento").setAttribute("y2", "78");

    document.getElementById("estado").textContent = "Estado: Apagada";
    document.getElementById("estado").style.color = "";

    document.getElementById("sim-panel").className = "info-box sim-container";
    setStep(0);
}