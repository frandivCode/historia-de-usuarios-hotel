# Sistema de Gestión de Ventas y Compras

## Integrantes

- **Integrante 1:** Francisco Zapata
- **Integrante 2:** Matias Menchaca
- **Integrante 3:** Namir Velez
- **Integrante 4:** Celeste Armonia

## Fecha

3 de Junio de 2026

---

## Descripción del Proyecto

Sistema en modo consola desarrollado en JavaScript para la gestión de ventas, compras, stock y reportes. El proyecto cumple con el módulo de facturación, abarcando la carga de cabecera, detalle, cálculo de subtotal, impuestos y total, además de la gestión de entidades y funcionalidades del dominio.

## Tecnologías Utilizadas

- **Lenguaje:** JavaScript
- **Control de Versiones:** Git / GitHub

## Funcionalidades Principales

1. **Gestión de Ventas:** Registro de operaciones y facturación.
2. **Control de Stock:** Actualización de inventario.
3. **Reportes:** Generación de informes de compras y ventas.

---

### Integrante 1

#### 📦 [Issue #01] - Registro de Huéspedes

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **registrar los datos personales de un nuevo huésped** para **mantener un control de las personas alojadas en el hotel**.
- **Criterios de Aceptación:**
- Los campos `Nombre`, `Apellido`, `DNI/Pasaporte` y `Correo Electrónico` son obligatorios.
- El sistema debe validar que el `DNI/Pasaporte` sea único; si ya existe, debe mostrar el error: _"El documento ingresado ya se encuentra registrado"_.
- El `Correo Electrónico` debe tener un formato válido (`usuario@dominio.com`).

#### 📦 [Issue #02] - Modificación de Datos del Huésped

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **editar la información de un huésped existente** para **corregir errores o actualizar sus datos de contacto**.
- **Criterios de Aceptación:**
- Se debe buscar al huésped por su `DNI/Pasaporte` o `ID único`.
- El campo `DNI/Pasaporte` no debe permitir modificaciones para evitar pérdida de historial.
- Al guardar los cambios exitosamente, el sistema debe mostrar el mensaje: _"Datos del huésped actualizados correctamente"_.

#### 📦 [Issue #03] - Baja de Huéspedes del Sistema

- **Historia de Usuario:**
  Como **Administrador**, quiero **dar de baja a un huésped del sistema** para **depurar la base de datos de registros inactivos**.
- **Criterios de Aceptación:**
- La baja debe ser lógica (cambio de estado a `Inactivo`), nunca física, para preservar el historial de facturación.
- No se puede dar de baja a un huésped que tenga una reserva activa o una deuda pendiente; en ese caso, mostrar el error: _"No se puede eliminar el huésped: Posee reservas o saldos activos"_.

---

### Integrante 2

#### 📦 [Issue #04] - Gestión de Habitaciones (Alta)

- **Historia de Usuario:**
  Como **Administrador**, quiero **dar de alta nuevas habitaciones en el sistema** para **ampliar la oferta disponible del hotel**.
- **Criterios de Aceptación:**
- Se deben ingresar obligatoriamente: `Número de habitación`, `Tipo` (Simple, Doble, Suite), `Precio por noche` y `Piso`.
- El `Número de habitación` debe ser único; si se repite, mostrar el error: _"El número de habitación ya existe"_.
- El `Precio por noche` debe ser un valor numérico mayor a cero.

#### 📦 [Issue #05] - Cambio de Estado de Habitación

- **Historia de Usuario:**
  Como **Personal de Limpieza**, quiero **cambiar el estado de una habitación (Disponible, Ocupada, Mantenimiento, Sucia)** para **que recepción sepa qué habitaciones se pueden asignar**.
- **Criterios de Aceptación:**
- Al hacer Check-Out, la habitación debe pasar automáticamente al estado `Sucia`.
- El personal de limpieza puede cambiar el estado de `Sucia` o `Mantenimiento` a `Disponible`.
- Una habitación en estado `Mantenimiento` o `Sucia` no puede ser seleccionada para una nueva reserva.

#### 📦 [Issue #06] - Consulta de Disponibilidad

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **filtrar las habitaciones por fecha y tipo** para **informar rápidamente a un cliente si hay lugar**.
- **Criterios de Aceptación:**
- La búsqueda requiere ingresar obligatoriamente una `Fecha de Entrada` y una `Fecha de Salida`.
- El sistema debe devolver una lista con los números de habitación que no se superpongan con reservas existentes en ese rango de fechas.
- Si no hay disponibilidad, se debe mostrar el mensaje: _"No se encontraron habitaciones disponibles para los criterios seleccionados"_.

---

### Integrante 3

#### 📦 [Issue #07] - Creación de Reservas

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **crear una nueva reserva vinculando un huésped y una habitación** para **asegurar su estadía en el hotel**.
- **Criterios de Aceptación:**
- Se debe seleccionar un huésped existente y una habitación en estado `Disponible`.
- La `Fecha de Entrada` debe ser igual o posterior a la fecha actual.
- Al confirmar, el sistema debe calcular automáticamente el `Monto Total` estimado (Noches $\times$ Precio de la habitación) y cambiar el estado de la reserva a `Confirmada`.

#### 📦 [Issue #08] - Cancelación de Reservas

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **cancelar una reserva a pedido del cliente** para **liberar la habitación para otros huéspedes**.
- **Criterios de Aceptación:**
- Se debe buscar la reserva mediante su `Código de Reserva`.
- Solo se pueden cancelar reservas cuyo estado sea `Confirmada` y falten más de 24 horas para el Check-In.
- Al cancelar, la reserva cambia a estado `Cancelada` y la habitación asociada vuelve a estar `Disponible`.

#### 📦 [Issue #09] - Registro de Check-In

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **registrar el ingreso efectivo del huésped (Check-In)** para **activar oficialmente su estadía**.
- **Criterios de Aceptación:**
- La acción se habilita únicamente en la fecha programada de la reserva.
- El sistema debe cambiar el estado de la reserva a `Activa` y el estado de la habitación a `Ocupada`.
- Se debe registrar la hora exacta del ingreso en el sistema.

---

### Integrante 4

#### 📦 [Issue #10] - Carga de Consumos Adicionales

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **cargar consumos extras (Room Service, Frigobar, Spa) a la cuenta de la habitación** para **cobrarlos al finalizar la estadía**.
- **Criterios de Aceptación:**
- Se debe seleccionar una habitación cuyo estado actual sea `Ocupada`.
- Es obligatorio seleccionar el `Servicio/Producto` de una lista predefinida con sus respectivos precios y especificar la `Cantidad`.
- El sistema debe sumar el subtotal del consumo al saldo pendiente de la reserva de forma inmediata.

#### 📦 [Issue #11] - Procesamiento de Check-Out y Facturación

- **Historia de Usuario:**
  Como **Recepcionista**, quiero **procesar la salida del huésped (Check-Out) y generar la factura final** para **concluir el servicio y recibir el pago**.
- **Criterios de Aceptación:**
- El sistema debe consolidar en un detalle el costo de los días de hospedaje más todos los consumos adicionales cargados.
- Es obligatorio seleccionar un `Método de Pago` (Efectivo, Tarjeta de Débito/Crédito, Transferencia).
- Una vez guardado, se debe cambiar el estado de la reserva a `Finalizada`, la habitación a `Sucia` y emitir un comprobante digital con el mensaje: _"Factura generada con éxito"_.

#### 📦 [Issue #12] - Reporte de Ingresos Mensuales

- **Historia de Usuario:**
  Como **Administrador**, quiero **generar un reporte de la facturación total del mes** para **analizar las ganancias y la ocupación del hotel**.
- **Criterios de Aceptación:**
- El sistema debe permitir filtrar por `Mes` y `Año`.
- El reporte debe mostrar el total recaudado desglosado por: Concepto de Habitaciones, Concepto de Consumos Adicionales y Métodos de Pago utilizados.
- Debe incluir un botón para exportar los datos o visualizarlos claramente en pantalla, mostrando un aviso si no hubo movimientos en ese período: _"No se registran transacciones para el mes seleccionado"_.
