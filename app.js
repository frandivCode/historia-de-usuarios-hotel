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
SistemaHotel.prototype.modificarHuesped = function (dni, nuevosDatos) {
    const huesped = this.huespedes.find(h => h.dni === dni);
    if (!huesped) throw new Error("Huésped no encontrado.");

    if (nuevosDatos.nombre) huesped.nombre = nuevosDatos.nombre;
    if (nuevosDatos.apellido) huesped.apellido = nuevosDatos.apellido;
    if (nuevosDatos.email) huesped.email = nuevosDatos.email;
    return "Datos del huésped actualizados correctamente.";
};
function registrarHuesped(nombre, apellido, dni, email) {
    if (!nombre || !apellido || !dni || !email) throw new Error("Todos los campos son obligatorios.");
    if (this.huespedes.some(h => h.dni === dni)) throw new Error("El documento ingresado ya se encuentra registrado.");
    if (!email.includes('@')) throw new Error("Formato de correo inválido.");

    const nuevoHuesped = new Huesped(nombre, apellido, dni, email);
    this.huespedes.push(nuevoHuesped);
    return "Huésped registrado exitosamente.";
}
