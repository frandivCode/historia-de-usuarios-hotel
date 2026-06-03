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
function registrarHuesped(nombre, apellido, dni, email) {
    if (!nombre || !apellido || !dni || !email) throw new Error("Todos los campos son obligatorios.");
    if (this.huespedes.some(h => h.dni === dni)) throw new Error("El documento ingresado ya se encuentra registrado.");
    if (!email.includes('@')) throw new Error("Formato de correo inválido.");

    const nuevoHuesped = new Huesped(nombre, apellido, dni, email);
    this.huespedes.push(nuevoHuesped);
    return "Huésped registrado exitosamente.";
}

// [Issue #07] - Creación de Reservas
    crearReserva(dni, numHabitacion, fechaIn, fechaOut) {
        const huesped = this.huespedes.find(h => h.dni === dni);
        const habitacion = this.habitaciones.find(h => h.numero === numHabitacion);

        if (!huesped) throw new Error("Huésped no registrado.");
        if (!habitacion || habitacion.estado !== 'Disponible') throw new Error("Habitación no disponible.");
        if (new Date(fechaIn) < new Date().setHours(0,0,0,0)) throw new Error("La fecha debe ser futura.");

        // Cálculo simple de noches
        const noches = Math.ceil((new Date(fechaOut) - new Date(fechaIn)) / (1000 * 60 * 60 * 24));
        const total = noches * habitacion.precioNoche;
        const codigoReserva = `RES-${Date.now().toString().slice(-4)}`; // Generador simple

        const reserva = new Reserva(codigoReserva, huesped, habitacion, fechaIn, fechaOut, total);
        this.reservas.push(reserva);
        return `Reserva ${codigoReserva} Confirmada. Total estimado: $${total}.`;
    }