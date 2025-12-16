let pantalla = document.getElementById("pantalla");
let botonEnviar = document.getElementById("btn-enviar");
let botonBorrar = document.getElementById("btn-borrar"); // botón borrar

// ---------- BOTÓN ENVIAR ----------
botonEnviar.addEventListener("click", () => {
    if (pantalla.textContent.trim() === "") {
        alert("No hay nada que enviar");
    } else {
        alert("Texto enviado: " + pantalla.textContent);
        pantalla.textContent = "";
    }
});

// ---------- BOTÓN BORRAR ----------
botonBorrar.addEventListener("click", () => {
    pantalla.textContent = pantalla.textContent.slice(0, -1);
});

// ---------- FUNCIONES ----------
function esVocal(letra) {
    return ["A", "E", "I", "O", "U"].includes(letra);
}

function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// ---------- TECLADO ALFABÉTICO ----------
let tecladoAlf = document.getElementById("teclado-alfabetico");

for (let codigo = 65; codigo <= 90; codigo++) {
    let letra = String.fromCharCode(codigo);
    let tecla = document.createElement("div");

    tecla.textContent = letra;
    tecla.className = "tecla";

    // Escribir letra en pantalla con límite de 5 caracteres
    tecla.addEventListener("click", () => {
        if (pantalla.textContent.length < 5) {
            pantalla.textContent += letra;
        }
    });

    tecladoAlf.appendChild(tecla);
}

// ---------- TECLADO NUMÉRICO ----------
let tecladoNum = document.getElementById("teclado-numerico");

for (let i = 1; i <= 9; i++) {
    let tecla = document.createElement("div");

    tecla.textContent = i;
    tecla.className = "tecla";

    // Escribir número en pantalla con límite de 5 caracteres
    tecla.addEventListener("click", () => {
        if (pantalla.textContent.length < 5) {
            pantalla.textContent += i;
        }
    });

    tecladoNum.appendChild(tecla);
}
