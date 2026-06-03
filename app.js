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
};