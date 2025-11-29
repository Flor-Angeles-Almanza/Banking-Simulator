// Obtener el contenedor donde se mostrará el registro
const contenedor = document.getElementById("registro");

// Leer los registros del localStorage
let registros = JSON.parse(localStorage.getItem("prestamos")) || [];

// Si no hay registros
if (registros.length === 0) {
    contenedor.innerHTML = "<p>No hay registros guardados.</p>";
} else {
    // Crear un texto con todos los registros
    let html = "<h2>Historial de préstamos</h2>";

    registros.forEach((reg, index) => {
        html += `
            <div style="margin-bottom: 20px;">
                <strong>Registro ${index + 1}:</strong><br>
                Monto solicitado: $${reg.monto}<br>
                Tasa anual: ${reg.tasa}%<br>
                Plazo: ${reg.plazo} años<br>
                Pago mensual: $${reg.pagoMensual}<br>
                Total a pagar: $${reg.total}<br>
                Fecha: ${reg.fecha}
                <hr>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}
