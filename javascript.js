let canvas = document.getElementById("juego");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zona = {
    radio: 700,
    x: canvas.width / 2,
    y: canvas.height / 2,
    velocidad: 0.1
};

let jugador = {
    x: Math.random() * canvas.width,
    y: 0,
    cayendo: true,
    vivo: true
};

let zombies = [];
for (let i = 0; i < 500; i++) {
    zombies.push({
        x: Math.random() * canvas.width * 3 - canvas.width,
        y: Math.random() * canvas.height * 3 - canvas.height
    });
}

function iniciarJuego() {
    document.getElementById("menu").style.display = "none";
    loop();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ZONA AZUL
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(zona.x, zona.y, zona.radio, 0, 2 * Math.PI);
    ctx.stroke();

    // CIERRE DE ZONA
    if (zona.radio > 100) zona.radio -= zona.velocidad;

    // JUGADOR
    if (jugador.cayendo) jugador.y += 5;
    if (jugador.y > canvas.height - 50) jugador.cayendo = false;

    ctx.fillStyle = "white";
    ctx.fillRect(jugador.x, jugador.y, 20, 20);

    // ZOMBIES FUERA DE ZONA
    ctx.fillStyle = "green";
    zombies.forEach(z => {
        let dist = Math.hypot(z.x - zona.x, z.y - zona.y);
        if (dist > zona.radio + 100) {
            ctx.fillRect(z.x, z.y, 10, 10);

            // matar jugador si sale
            let distJugador = Math.hypot(jugador.x - z.x, jugador.y - z.y);
            if (distJugador < 20) jugador.vivo = false;
        }
    });

    if (!jugador.vivo) {
        alert("HAS MUERTO FUERA DE ZONA");
        location.reload();
        return;
