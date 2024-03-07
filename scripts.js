let fichasCounter = 1;

document.getElementById('agregarFichasBtn').addEventListener('click', function () {
    agregarElemento('fichas');
});

document.getElementById('generarBtn').addEventListener('click', function () {
    generarRespuesta();
});

function agregarElemento(tipo) {
    const containerId = `${tipo}Container`;
    const elementoContainer = document.getElementById(containerId);

    if (elementoContainer) {
        const elemento = document.createElement('div');
        elemento.classList.add(`${tipo}-container`);
        elemento.innerHTML = `
            <label for="${tipo}${fichasCounter}">Nombre del Bloque de Fichas ${fichasCounter}:</label>
            <input type="text" id="${tipo}${fichasCounter}" placeholder="Nombre del grupo">
            <input type="number" min="1" placeholder="Ingrese la cantidad">
            <button onclick="eliminarElemento('${tipo}', ${fichasCounter})">Eliminar</button>
        `;

        elementoContainer.appendChild(elemento);
        fichasCounter++;
    }
}

function eliminarElemento(tipo, elementId) {
    const elementoContainer = document.getElementById(`${tipo}Container`);
    if (elementoContainer) {
        const elemento = document.getElementById(`${tipo}${elementId}`);
        if (elemento) {
            elemento.parentElement.remove();
        }
    }
}

function generarRespuesta() {
    const numJugadores = document.getElementById('numJugadores').value;
    const fichas = document.querySelectorAll('.fichas-container input[type="number"]');
    const nombresGrupos = Array.from(document.querySelectorAll('.fichas-container input[type="text"]')).map(input => input.value);

    const distribucion = distribuirFichas(numJugadores, fichas);

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '<p>Distribución de Fichas:</p>';

    for (let j = 0; j < distribucion[0].length; j++) {
        const grupoNombre = nombresGrupos[j];
        const fichasAsignadas = distribucion[0][j].entero;

        resultadoDiv.innerHTML += `<p>${fichasAsignadas} fichas del grupo ${grupoNombre}`;

        if (distribucion[0][j].decimal > 0) {
            resultadoDiv.innerHTML += ` (quedan ${distribucion[0][j].decimal} sin usar)`;
        }

        resultadoDiv.innerHTML += `</p>`;
    }
}

function distribuirFichas(numJugadores, fichas) {
    const distribucion = [];
    let totalFichas = 0;

    for (let i = 0; i < fichas.length; i++) {
        totalFichas += parseInt(fichas[i].value) || 0;
    }

    for (let i = 0; i < numJugadores; i++) {
        distribucion[i] = [];
        for (let j = 0; j < fichas.length; j++) {
            const cantidad = parseInt(fichas[j].value) || 0;
            const fichasAsignadas = Math.floor(cantidad / numJugadores);
            const fichasSobrantes = cantidad % numJugadores;
            distribucion[i].push({ entero: fichasAsignadas, decimal: fichasSobrantes });
        }
    }

    return distribucion;
}
