function mostrarMensaje() {
  alert("¡Bienvenido a ZONA ROJA Z!");
}

document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll("button");
  botones.forEach(boton => {
    boton.addEventListener("click", mostrarMensaje);
  });
});
