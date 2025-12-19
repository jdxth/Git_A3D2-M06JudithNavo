// Crear el elemento <p>
const parrafo = document.createElement("p");

// Añadir el texto al párrafo
parrafo.textContent = "Este es un párrafo añadido";

// Añadir el párrafo dentro del div
document.getElementById("contenedor").appendChild(parrafo);
