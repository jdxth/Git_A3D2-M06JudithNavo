// ELEMENTOS
const tablero = document.getElementById("tablero");
const tecladoAlf = document.getElementById("teclado-alfabetico");
const tecladoNum = document.getElementById("teclado-numerico");
const botonEnviar = document.getElementById("btn-enviar");
const botonBorrar = document.getElementById("btn-borrar");
const botonReiniciar = document.getElementById("btn-reiniciar");
const mensajeError = document.getElementById("mensaje-error");

// CONFIGURACIÓN
const maxIntentos = 6;
const longitud = 5;

let palabra = "";
let intentoActual = 0;
let letraActual = 0;
let filas = [];

// PALABRA SECRETA
function palabraSecreta() {
    fetch('https://random-word-api.herokuapp.com/word?lang=es&length=5')
        .then(res => res.json())
        .then(data => {
            palabra = data[0].toUpperCase();
            console.log("Palabra secreta:", palabra);
        });
}

// CREAR TABLERO
function crearTablero() {
    for (let i = 0; i < maxIntentos; i++) {
        const fila = document.createElement("div");
        fila.className = "fila";

        let celdas = [];
        for (let j = 0; j < longitud; j++) {
            const celda = document.createElement("div");
            celda.className = "celda";
            fila.appendChild(celda);
            celdas.push(celda);
        }

        tablero.appendChild(fila);
        filas.push(celdas);
    }
}

// ESCRIBIR
function escribirTecla(valor) {
    if (letraActual < longitud && intentoActual < maxIntentos) {
        filas[intentoActual][letraActual].textContent = valor;
        letraActual++;
    }
}

// BORRAR
function borrarUltimo() {
    if (letraActual > 0) {
        letraActual--;
        filas[intentoActual][letraActual].textContent = "";
    }
}

// COMPROBAR
function comprobar() {
    let palabraUsuario = filas[intentoActual]
        .map(c => c.textContent)
        .join("");

    if (palabraUsuario.length < longitud) {
        mensajeError.textContent = "Faltan letras";
        return;
    }

    mensajeError.textContent = "";
    let palabraTemp = palabra.split("");

    filas[intentoActual].forEach((celda, i) => {
        if (celda.textContent === palabra[i]) {
            celda.classList.add("correcta");
            palabraTemp[i] = null;
        }
    });

    filas[intentoActual].forEach((celda, i) => {
        if (
            !celda.classList.contains("correcta") &&
            palabraTemp.includes(celda.textContent)
        ) {
            celda.classList.add("presente");
            palabraTemp[palabraTemp.indexOf(celda.textContent)] = null;
        } else if (!celda.classList.contains("correcta")) {
            celda.classList.add("incorrecta");
        }
    });

    if (palabraUsuario === palabra) {
        alert("You Win!");
        intentoActual = maxIntentos;
        return;
    }

    intentoActual++;
    letraActual = 0;

    if (intentoActual === maxIntentos) {
        alert("You Lose! La palabra era: " + palabra);
    }
}

// REINICIAR 
function reiniciarJuego() {

    tablero.innerHTML = "";
    filas = [];

    intentoActual = 0;
    letraActual = 0;


    mensajeError.textContent = "";

    palabraSecreta();
    crearTablero();
}

// TECLADO ALFABÉTICO
function crearTecladoAlfabetico() {
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i);
        const tecla = document.createElement("div");
        tecla.textContent = letra;
        tecla.className = "tecla";
        tecla.addEventListener("click", () => escribirTecla(letra));
        tecladoAlf.appendChild(tecla);
    }
}

// TECLADO NUMÉRICO (opcional)
function crearTecladoNumerico() {
    for (let i = 1; i <= 9; i++) {
        const tecla = document.createElement("div");
        tecla.textContent = i;
        tecla.className = "tecla";
        tecla.addEventListener("click", () => escribirTecla(i));
        tecladoNum.appendChild(tecla);
    }
}

// EVENTOS
botonEnviar.addEventListener("click", comprobar);
botonBorrar.addEventListener("click", borrarUltimo);
botonReiniciar.addEventListener("click", reiniciarJuego);

// INICIO
palabraSecreta();
crearTablero();
crearTecladoAlfabetico();
crearTecladoNumerico();