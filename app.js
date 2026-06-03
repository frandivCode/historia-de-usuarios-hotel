// --- CLASES BASE ---

class Huesped {
    constructor(nombre, apellido, dni, email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.estado = 'Activo';
    }
}

class Habitacion {
    constructor(numero, tipo, precioNoche, piso) {
        this.numero = numero;
        this.tipo = tipo;
        this.precioNoche = precioNoche;
        this.piso = piso;
        this.estado = 'Disponible'; // Disponible, Ocupada, Mantenimiento, Sucia
    }
}

class Reserva {
    constructor(codigo, huesped, habitacion, fechaIn, fechaOut, total) {
        this.codigo = codigo;
        this.huesped = huesped;
        this.habitacion = habitacion;
        this.fechaIn = new Date(fechaIn);
        this.fechaOut = new Date(fechaOut);
        this.estado = 'Confirmada'; // Confirmada, Activa, Cancelada, Finalizada
        this.totalEstadia = total;
        this.consumosExtras = [];
    }
}

// --- CLASE PRINCIPAL (GESTIÓN DE LOS ISSUES) ---

/* === Integrante 1 === */
SistemaHotel.prototype.registrarHuesped = function (nombre, apellido, dni, email) {
    if (!nombre || !apellido || !dni || !email) throw new Error("Todos los campos son obligatorios.");
    if (this.huespedes.some(h => h.dni === dni)) throw new Error("El documento ingresado ya se encuentra registrado.");
    if (!email.includes('@')) throw new Error("Formato de correo inválido.");

    const nuevoHuesped = new Huesped(nombre, apellido, dni, email);
    this.huespedes.push(nuevoHuesped);
    return "Huésped registrado exitosamente.";
};

SistemaHotel.prototype.modificarHuesped = function (dni, nuevosDatos) {
    const huesped = this.huespedes.find(h => h.dni === dni);
    if (!huesped) throw new Error("Huésped no encontrado.");

    if (nuevosDatos.nombre) huesped.nombre = nuevosDatos.nombre;
    if (nuevosDatos.apellido) huesped.apellido = nuevosDatos.apellido;
    if (nuevosDatos.email) huesped.email = nuevosDatos.email;
    return "Datos del huésped actualizados correctamente.";
};

SistemaHotel.prototype.bajaHuesped = function (dni) {
    const huesped = this.huespedes.find(h => h.dni === dni);
    if (!huesped) throw new Error("Huésped no encontrado.");

    const tieneReservasActivas = this.reservas.some(r => r.huesped.dni === dni && (r.estado === 'Confirmada' || r.estado === 'Activa'));
    if (tieneReservasActivas) throw new Error("No se puede eliminar el huésped: Posee reservas o saldos activos.");

    huesped.estado = 'Inactivo';
    return "Huésped dado de baja (lógica) exitosamente.";
};

/* === Integrante 2 === */

SistemaHotel.prototype.altaHabitacion = function (numero, tipo, precio, piso) {
    if (!numero || !tipo || !precio || !piso) throw new Error("Faltan datos de la habitación.");
    if (this.habitaciones.some(h => h.numero === numero)) throw new Error("El número de habitación ya existe.");
    if (precio <= 0) throw new Error("El precio debe ser mayor a cero.");

    this.habitaciones.push(new Habitacion(numero, tipo, precio, piso));
    return "Habitación creada.";
};

SistemaHotel.prototype.cambiarEstadoHabitacion = function (numero, nuevoEstado) {
    const hab = this.habitaciones.find(h => h.numero === numero);
    if (!hab) throw new Error("Habitación no encontrada.");

    const estadosValidos = ['Disponible', 'Ocupada', 'Mantenimiento', 'Sucia'];
    if (!estadosValidos.includes(nuevoEstado)) throw new Error("Estado inválido.");

    hab.estado = nuevoEstado;
    return `Estado de habitación ${numero} cambiado a ${nuevoEstado}.`;
};

SistemaHotel.prototype.consultarDisponibilidad = function (fechaIn, fechaOut) {
    if (!fechaIn || !fechaOut) throw new Error("Fechas obligatorias.");
    const disponibles = this.habitaciones.filter(h => h.estado === 'Disponible');

    if (disponibles.length === 0) {
        throw new Error("No se encontraron habitaciones disponibles para los criterios seleccionados.");
    }
    return disponibles;
};

/* === Integrante 3 === */

SistemaHotel.prototype.crearReserva = function(dni, numHabitacion, fechaIn, fechaOut) {
    const huesped = this.huespedes.find(h => h.dni === dni);
    const habitacion = this.habitaciones.find(h => h.numero === numHabitacion);

    if (!huesped) throw new Error("Huésped no registrado.");
    if (!habitacion || habitacion.estado !== 'Disponible') throw new Error("Habitación no disponible.");
    if (new Date(fechaIn) < new Date().setHours(0,0,0,0)) throw new Error("La fecha debe ser futura.");

    const noches = Math.ceil((new Date(fechaOut) - new Date(fechaIn)) / (1000 * 60 * 60 * 24));
    const total = noches * habitacion.precioNoche;
    const codigoReserva = `RES-${Date.now().toString().slice(-4)}`; 

    const reserva = new Reserva(codigoReserva, huesped, habitacion, fechaIn, fechaOut, total);
    this.reservas.push(reserva);
    return `Reserva ${codigoReserva} Confirmada. Total estimado: $${total}.`;
};

cargarConsumoExtra(numHabitacion, producto, cantidad, precioUnitario) {
        const reservaActiva = this.reservas.find(r => r.habitacion.numero === numHabitacion && r.estado === 'Activa');
        if (!reservaActiva) throw new Error("No hay reservas activas en esta habitación.");

        const subtotal = cantidad * precioUnitario;
        reservaActiva.consumosExtras.push({ producto, cantidad, subtotal });
        return `Consumo cargado. Subtotal: $${subtotal}.`;
    }

    procesarCheckOut(codigo, metodoPago) {
        const reserva = this.reservas.find(r => r.codigo === codigo);
        if (!reserva || reserva.estado !== 'Activa') throw new Error("Reserva no válida para Check-Out.");
        if (!metodoPago) throw new Error("Seleccione un método de pago.");

        const totalExtras = reserva.consumosExtras.reduce((acc, item) => acc + item.subtotal, 0);
        const totalFinal = reserva.totalEstadia + totalExtras;

        reserva.estado = 'Finalizada';
        reserva.habitacion.estado = 'Sucia';

        this.facturacionMes.push({ fecha: new Date(), monto: totalFinal, metodo: metodoPago });

        return `Factura generada con éxito. Total a cobrar: $${totalFinal} abonado con ${metodoPago}.`;
    }