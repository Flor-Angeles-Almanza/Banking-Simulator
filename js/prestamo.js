class Prestamo {
    constructor(m, t, p) {
        this.monto = m;
        this.tasa = t;
        this.plazo = p;
    }

    // 1. Calcular el pago mensual
    calcularPagoMensual() {
        const tasaMensual = this.tasa / 100 / 12;
        const numeroDePagos = this.plazo * 12;
        const pagoMensual = (this.monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -numeroDePagos));
        return pagoMensual.toFixed(2);
    }

    // 2. Resumen
    resumen() {
        const pago = this.calcularPagoMensual();
        const total = (pago * this.plazo * 12).toFixed(2);

        return `
            <strong>Resumen del préstamo:</strong><br>
            Monto solicitado: $${this.monto}<br>
            Tasa anual: ${this.tasa}%<br>
            Plazo: ${this.plazo} años<br>
            Pago mensual: $${pago}<br>
            Total a pagar: $${total}<br>
        `;
    }
}

// 3. Escuchar evento
document.getElementById("forma").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los datos
    const monto = parseFloat(document.getElementById('monto').value);
    const tasa = parseFloat(document.getElementById('tasa').value);
    const plazo = parseFloat(document.getElementById('plazo').value);

    // Validar datos
    if (isNaN(monto) || isNaN(tasa) || isNaN(plazo)) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    // Instanciar
    const objPrestamo = new Prestamo(monto, tasa, plazo);

    // Mostrar resultado
    document.getElementById('resumen').innerHTML = objPrestamo.resumen();




    

    // === NUEVO BLOQUE: Guardar en localStorage ===
    const pago = objPrestamo.calcularPagoMensual();
    const total = (pago * plazo * 12).toFixed(2);

    // Crear el objeto del registro
    const registro = {
        monto: monto,
        tasa: tasa,
        plazo: plazo,
        pagoMensual: pago,
        total: total,
        fecha: new Date().toLocaleString() // opcional: guarda fecha y hora
    };

    // 1. Obtener registros existentes o crear arreglo vacío
    let registros = JSON.parse(localStorage.getItem("prestamos")) || [];

    // 2. Agregar el nuevo
    registros.push(registro);

    // 3. Guardar el arreglo actualizado
    localStorage.setItem("prestamos", JSON.stringify(registros));

    console.log("Registro guardado en localStorage:", registro);
});
