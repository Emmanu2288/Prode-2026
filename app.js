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
];

let aciertosExactos = 0;
let pronosticos = [];

// Funciones para pedirle los resultados al usuario
function pedirPronosticos() {
    for (let i = 0; i < partidos.length; i++) {
        let partido = partidos[i];

        let golesEquipo1 = parseInt(prompt(`Partido ${i + 1}:\n${partido.equipo1} vs ${partido.equipo2}\nIngresa los goles de ${partido.equipo1}:`));
        let golesEquipo2 = parseInt(prompt(`Ingresa los goles de ${partido.equipo2}:`));

        // Validacion
        if (isNaN(golesEquipo1) || isNaN(golesEquipo2)) {
            alert("Ingresaste un valor inválido. Se registrará como 0 a 0.");
            golesEquipo1 = 0;
            golesEquipo2 = 0;
        }
        pronosticos.push({golesEquipo1, golesEquipo2});
    }
        }
    // Función para calcular los pronosticos
    function calcularPronosticos() {
        for (let i = 0; i < partidos.length; i++) {
            let real = partidos[i];
            let usuario = pronosticos[i];

            if (real.golesEquipo1 === usuario.golesEquipo1 && real.golesEquipo2 === usuario.golesEquipo2) {
                aciertosExactos++;
                console.log(`✅ Partido ${i + 1}: Acertaste el resultado exacto (${real.golesEquipo1} a ${real.golesEquipo2})`);
            } else {
                console.log(`❌ Partido ${i + 1}: No acertaste. Resultado exacto: (${real.golesEquipo1} a ${real.golesEquipo2})`);
            }
        }
    }

// Función para mostrar el resultado final
function mostrarResultadoFinal() {
    alert(`Tuviste ${aciertosExactos} aciertos exactos de ${partidos.length} partidos.`);
    console.log("Pronósticos ingresados:", pronosticos);
    console.log("Total de aciertos exactos:", aciertosExactos);
}

//Funcion principal
function iniciarSimulacion() {
    let iniciar = confirm("¿Deseas ingresar tus pronósticos para los partidos?");
    if (iniciar) {
        pedirPronosticos();
        calcularPronosticos();
        mostrarResultadoFinal();
    } else {
        alert("Simulación cancelada.");
    }
}

//Ejecutar la simulación
iniciarSimulacion();
