/**
 * Constructor para crear un objeto de pronóstico de partido
 * @param {string} equipo1 - Nombre del primer equipo.
 * @param {string} equipo2 - Nombre del segundo equipo.
 * @param {number} golesEquipo1 - Goles pronosticados para el primer equipo.
 * @param {number} golesEquipo2 - Goles pronosticados para el segundo equipo. 
 */
function Pronostico(equipo1, equipo2, golesEquipo1, golesEquipo2) {
  this.equipo1 = equipo1;
  this.equipo2 = equipo2;
  this.golesEquipo1 = golesEquipo1;
  this.golesEquipo2 = golesEquipo2;
}

/**
 * Obtiene la lista de partidos desde un archivo JSON local.
 * Simula el uso de una API externa.
 * Una vez cargados los datos, genera el formulario dinámico.
 */
async function obtenerPartidos() {
  try {
    const response = await fetch("partidos.json");
    const data = await response.json();
    partidos = data;
    generarFormulario();
  } catch (error) {
    console.error("Error al cargar partidos:", error);
  }
}

// Constantes y variables: Códigos ISO de países para banderas
const codigosISO = {
  "Argentina": "ar",
  "Brasil": "br",
  "Estados Unidos": "us",
  "Canadá": "ca",
  "México": "mx",
  "Japón": "jp",
  "Nueva Zelanda": "nz",
  "Irán": "ir",
  "Uzbekistán": "uz",
  "Corea del Sur": "kr",
  "Jordania": "jo",
  "Australia": "au",
  "Ecuador": "ec",
  "Uruguay": "uy",
  "Colombia": "co",
  "Paraguay": "py",
  "Túnez": "tn",
  "Marruecos": "ma",
  "Egipto": "eg",
  "Argelia": "dz",
  "Ghana": "gh",
  "Cabo Verde": "cv",
  "Sudáfrica": "za",
  "Catar": "qa",
  "Arabia Saudita": "sa",
  "Inglaterra": "gb-eng",
  "Costa de Marfil": "ci",
  "Senegal": "sn"
};

// Cargar pronósticos guardados
let pronosticos = JSON.parse(localStorage.getItem("pronosticos")) || [];

// Elementos del DOM
const form = document.getElementById("formPronosticos");
const contador = document.getElementById("contador");


/**
 * Genera un formulario dinámico con inputs para cada partido.
 * Incluye banderas, iconos de pelota, validaciones y carga de datos previos.
 */
function generarFormulario() {
  form.innerHTML = "";
  partidos.forEach((partido, index) => {
    const div = document.createElement("div");
    div.classList.add("partido");
    div.innerHTML = `
      <label class="form-label fw-bold">
        <img src="https://flagcdn.com/24x18/${codigosISO[partido.equipo1]}.png" alt="${partido.equipo1}" class="me-1">
        ${partido.equipo1} vs <img src="https://flagcdn.com/24x18/${codigosISO[partido.equipo2]}.png" alt="${partido.equipo2}" class="me-1">
        ${partido.equipo2}
      </label><br>
      <span class="icono-pelota">⚽</span>
      <input type="number" min="0" id="g1-${index}" class="input-goles form-control d-inline" placeholder="${partido.equipo1}">
      <span class="icono-pelota">⚽</span>
      <input type="number" min="0" id="g2-${index}" class="input-goles form-control d-inline" placeholder="${partido.equipo2}">
      <div id="error-${index}" class="text-danger small mt-1"></div>
    `;
    form.appendChild(div);
  });

  // Cargar valores guardados
  pronosticos.forEach((p, i) => {
    document.getElementById(`g1-${i}`).value = p.golesEquipo1;
    document.getElementById(`g2-${i}`).value = p.golesEquipo2;
  });

  actualizarContador();
  activarValidaciones();
}
/**
 * Activa la validación en vivo para los inputs de goles.
 * Resalta los inputs en rojo o verde según la validez del valor ingresado.
 * Actualiza el contador y el auto-guardado en localStorage.
 */
function activarValidaciones() {
  form.querySelectorAll("input[type='number']").forEach((input, i) => {
    input.addEventListener("input", () => {
      const val = parseInt(input.value);
      const error = document.getElementById(`error-${Math.floor(i / 2)}`);
      if (isNaN(val) || val < 0) {
        input.style.border = "2px solid red";
        error.textContent = "⚠️ Ingresá un número válido (0 o más)";
      } else {
        input.style.border = "2px solid green";
        error.textContent = "";
      }
      guardarAuto();
      actualizarContador();
    });
  });
}

/**
 * Actualiza el contador dinamico que muestra cuantos partidos fueron completados.
 */
function actualizarContador() {
  let completos = 0;
  form.querySelectorAll("input[type='number']").forEach(input => {
    if (input.value.trim() !== "") completos++;
  });
  contador.textContent = `Completaste ${Math.floor(completos / 2)} de ${partidos.length} partidos`;
}
/**
 * Guarda automáticamente los pronósticos en localStorage.
 * Se ejecuta cada vez que el usuario ingresa un valor en los inputs.
 */
function guardarAuto() {
  let nuevos = [];
  partidos.forEach((partido, i) => {
    const g1 = parseInt(document.getElementById(`g1-${i}`).value) || 0;
    const g2 = parseInt(document.getElementById(`g2-${i}`).value) || 0;
    nuevos.push(new Pronostico(partido.equipo1, partido.equipo2, g1, g2));
  });
  localStorage.setItem("pronosticos", JSON.stringify(nuevos));
}

/**
 * Evento que se ejecuta al hacer clic en el botón "Calcular Resultados".
 * Compara los pronósticos con los resultados reales, muestra aciertos y fallos.
 * Resalta visualmente los partidos y muestra un resumen en un popup de SweetAlert2.
 */
document.getElementById("btnCalcular").addEventListener("click", () => {
  let aciertos = [];
  let fallos = [];
  let nuevos = [];
  let aciertosExactos = 0;

  partidos.forEach((partido, i) => {
    const input1 = document.getElementById(`g1-${i}`);
    const input2 = document.getElementById(`g2-${i}`);

    const goles1 = input1.value.trim() === "" ? 0 : parseInt(input1.value);
    const goles2 = input2.value.trim() === "" ? 0 : parseInt(input2.value);

    const pronostico = new Pronostico(partido.equipo1, partido.equipo2, goles1, goles2);
    nuevos.push(pronostico);

    const esAcierto = goles1 === partido.golesEquipo1 && goles2 === partido.golesEquipo2;

    // Resaltado visual
    const divPartido = input1.closest(".partido");
    divPartido.classList.remove("acierto", "fallo");
    divPartido.classList.add(esAcierto ? "acierto" : "fallo");

    const fila = `
      <div style="margin-bottom: 10px;">
        <strong>${pronostico.equipo1} ${goles1} - ${pronostico.equipo2} ${goles2}</strong><br>
        <span style="color: gray;">Resultado real: ${partido.golesEquipo1} - ${partido.golesEquipo2}</span>
      </div>
    `;

    if (esAcierto) {
      aciertos.push("✅ " + fila);
      aciertosExactos++;
    } else {
      fallos.push("❌ " + fila);
    }
  });

  // Guardar en localStorage
  pronosticos = nuevos;
  localStorage.setItem("pronosticos", JSON.stringify(pronosticos));

  // Mostrar popup con SweetAlert2
  Swal.fire({
    title: '🌟 Resultados del PRODE 🌟',
    html: `
      <div style="text-align: center; margin-bottom: 15px;">
        <h2 style="color: #FFD700;">🥇 ${aciertosExactos} / ${partidos.length} aciertos exactos</h2>
      </div>
      <div style="text-align: left;">
        <h3 style="color: #007B5A;">✅ Aciertos (${aciertos.length})</h3>
        ${aciertos.length > 0 ? aciertos.join("") : "<p>😕 No acertaste ningún resultado exacto.</p>"}
        <hr>
        <h3 style="color: #004AAD;">❌ Fallos (${fallos.length})</h3>
        ${fallos.length > 0 ? fallos.join("") : "<p>🎉 ¡Todos los resultados fueron correctos!</p>"}
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Cerrar',
    background: '#F5F5F5',
    color: '#333',
    customClass: {
      popup: 'swal-wide'
    }
  });
});

/**
 * Evento que se ejecuta al hacer clic en el botón "Limpiar Pronósticos".
 * Elimina los pronósticos guardados en localStorage y reinicia el formulario.
 */
document.getElementById("btnLimpiar").addEventListener("click", () => {
  localStorage.removeItem("pronosticos");
  pronosticos = [];
  generarFormulario();
});

/**
 * Inicialización: Genera el formulario al cargar la página.
 */
obtenerPartidos();
