// Constructor de pronóstico
function Pronostico(equipo1, equipo2, golesEquipo1, golesEquipo2) {
  this.equipo1 = equipo1;
  this.equipo2 = equipo2;
  this.golesEquipo1 = golesEquipo1;
  this.golesEquipo2 = golesEquipo2;
}

// Constantes y variables
const partidos = [
    {equipo1: "Argentina", equipo2: "Brasil", golesEquipo1: 3, golesEquipo2: 0},
    {equipo1: "Estados Unidos", equipo2: "Canadá", golesEquipo1: 1, golesEquipo2: 0},
    {equipo1: "México", equipo2: "Japón", golesEquipo1: 2, golesEquipo2: 2},
    {equipo1: "Nueva Zelanda", equipo2: "Irán", golesEquipo1: 1, golesEquipo2: 0},
    {equipo1: "Uzbekistán", equipo2: "Corea del Sur", golesEquipo1: 1, golesEquipo2: 2},
    {equipo1: "Jordania", equipo2: "Australia", golesEquipo1: 0, golesEquipo2: 1},
    {equipo1: "Ecuador", equipo2: "Uruguay", golesEquipo1: 0, golesEquipo2: 0},
    {equipo1: "Colombia", equipo2: "Paraguay", golesEquipo1: 2, golesEquipo2: 0},
    {equipo1: "Túnez", equipo2: "Marruecos", golesEquipo1: 1, golesEquipo2: 1},
];

let pronosticos = [];

// Cargar pronósticos guardados
if (localStorage.getItem("pronosticos")) {
  pronosticos = JSON.parse(localStorage.getItem("pronosticos"));
}

// Generar formulario dinámico
const form = document.getElementById("formPronosticos");
partidos.forEach((partido, index) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>${partido.equipo1} vs ${partido.equipo2}</label><br>
    <input type="number" min="0" id="g1-${index}" placeholder="Goles de ${partido.equipo1}">
    <input type="number" min="0" id="g2-${index}" placeholder="Goles de ${partido.equipo2}">
    <hr>
  `;
  form.appendChild(div);
});

// Calcular aciertos
document.getElementById("btnCalcular").addEventListener("click", () => {
  pronosticos = []; // Reiniciar
  let aciertosExactos = 0;

  partidos.forEach((partido, index) => {
    const goles1 = parseInt(document.getElementById(`g1-${index}`).value);
    const goles2 = parseInt(document.getElementById(`g2-${index}`).value);

    const pronostico = new Pronostico(partido.equipo1, partido.equipo2, goles1 || 0, goles2 || 0);
    pronosticos.push(pronostico);

    if (goles1 === partido.golesEquipo1 && goles2 === partido.golesEquipo2) {
      aciertosExactos++;
    }
  });

  // Guardar en localStorage
  localStorage.setItem("pronosticos", JSON.stringify(pronosticos));

  // Mostrar resultados
  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = `<p>Tuviste ${aciertosExactos} aciertos exactos de ${partidos.length} partidos.</p>`;

  pronosticos.forEach((p, i) => {
    const real = partidos[i];
    const resultado = document.createElement("p");
    resultado.textContent = `${p.equipo1} ${p.golesEquipo1} - ${p.equipo2} ${p.golesEquipo2} | Resultado real: ${real.golesEquipo1} - ${real.golesEquipo2}`;
    resultadosDiv.appendChild(resultado);
  });
});
