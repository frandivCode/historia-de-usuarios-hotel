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
SistemaHotel.prototype.bajaHuesped = function (dni) {
    const huesped = this.huespedes.find(h => h.dni === dni);
    if (!huesped) throw new Error("Huésped no encontrado.");

    const tieneReservasActivas = this.reservas.some(r => r.huesped.dni === dni && (r.estado === 'Confirmada' || r.estado === 'Activa'));
    if (tieneReservasActivas) throw new Error("No se puede eliminar el huésped: Posee reservas o saldos activos.");

    huesped.estado = 'Inactivo';
    return "Huésped dado de baja (lógica) exitosamente.";

/* Integrante 1 */
function registrarHuesped(nombre, apellido, dni, email) {
    if (!nombre || !apellido || !dni || !email) throw new Error("Todos los campos son obligatorios.");
    if (this.huespedes.some(h => h.dni === dni)) throw new Error("El documento ingresado ya se encuentra registrado.");
    if (!email.includes('@')) throw new Error("Formato de correo inválido.");

    const nuevoHuesped = new Huesped(nombre, apellido, dni, email);
    this.huespedes.push(nuevoHuesped);
    return "Huésped registrado exitosamente.";
}

SistemaHotel.prototype.modificarHuesped = function (dni, nuevosDatos) {
    const huesped = this.huespedes.find(h => h.dni === dni);
    if (!huesped) throw new Error("Huésped no encontrado.");

    if (nuevosDatos.nombre) huesped.nombre = nuevosDatos.nombre;
    if (nuevosDatos.apellido) huesped.apellido = nuevosDatos.apellido;
    if (nuevosDatos.email) huesped.email = nuevosDatos.email;
    return "Datos del huésped actualizados correctamente.";
};

altaHabitacion(numero, tipo, precio, piso) {
        if (!numero || !tipo || !precio || !piso) throw new Error("Faltan datos de la habitación.");
        if (this.habitaciones.some(h => h.numero === numero)) throw new Error("El número de habitación ya existe.");
        if (precio <= 0) throw new Error("El precio debe ser mayor a cero.");

        this.habitaciones.push(new Habitacion(numero, tipo, precio, piso));
        return "Habitación creada.";
    }

    cambiarEstadoHabitacion(numero, nuevoEstado) {
        const hab = this.habitaciones.find(h => h.numero === numero);
        if (!hab) throw new Error("Habitación no encontrada.");
        
        const estadosValidos = ['Disponible', 'Ocupada', 'Mantenimiento', 'Sucia'];
        if (!estadosValidos.includes(nuevoEstado)) throw new Error("Estado inválido.");

        hab.estado = nuevoEstado;
        return `Estado de habitación ${numero} cambiado a ${nuevoEstado}.`;
    }
    
    consultarDisponibilidad(fechaIn, fechaOut) {
        if (!fechaIn || !fechaOut) throw new Error("Fechas obligatorias.");
        const disponibles = this.habitaciones.filter(h => h.estado === 'Disponible');
        
        if (disponibles.length === 0) {
            throw new Error("No se encontraron habitaciones disponibles para los criterios seleccionados.");
        }
        return disponibles;
    }