const Contact = require('../models/Contact');

// Controlador para obtener todos los contactos
exports.getAllContacts = (req, res) => {
    // Utiliza el modelo Contact para obtener todos los contactos
    Contact.getAll((err, contacts) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(contacts);
        }
    });
};

// Controlador para crear un nuevo contacto
exports.createContact = (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { rut, nombre, numero, asistencias } = req.body;

    // Crear un nuevo objeto Contact con los datos
    const newContact = new Contact(rut, nombre, numero, asistencias || 0);

    // Llamar al método estático "create" del modelo Contact
    // Validar si el rut ya existe
    Contact.getByRut(rut, (err, contact) => {
        if (err) {
            console.error(err.message);
            res.status(500).json('Error en el servidor');
        } else if (contact) {
            res.status(400).json('Contacto con rut ya existe');
        } else {
            // Llamar al método "createContact" con una función de callback
            Contact.createContact(newContact, (err) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json('Error al crear el contacto');
                } else {
                    // Envía una respuesta de éxito al cliente
                    res.status(201).json(newContact);
                }
            });
        }
    });
}

exports.markAttendance = (req, res) => {
    const { rut } = req.params;
    const { nuevaAsistencias } = req.body;

    // Obtener el número de asistencias actual del contacto
    Contact.getAsistenciasByRut(rut, (err, asistenciasActuales) => {
        if (err) {
            console.error(err.message);
            res.status(500).json('Error en el servidor');
        } else {
            // Calcular el nuevo número de asistencias sumando las actuales y las nuevas
            const nuevoTotalAsistencias = asistenciasActuales + nuevaAsistencias;
            // Validar que el nuevo total esté dentro del rango de 1 a 8
            if (nuevoTotalAsistencias /*>= 1 && nuevoTotalAsistencias <= 8*/) {
                // Actualizar el número de asistencias en la base de datos
                Contact.updateAsistenciasByRut(rut, nuevaAsistencias, (err) => {
                    if (err) {
                        console.error(err.message);
                        res.status(500).json('Error en el servidor');
                    } else {
                        // Enviar el número de asistencias actualizado en la respuesta JSON
                        res.json({ message: 'Asistencias actualizadas exitosamente', asistencias: nuevoTotalAsistencias });
                    }
                });
            } else {
                res.status(400).json('El nuevo total de asistencias debe estar en el rango de 1 a 8');
            }
        }
    });
};

exports.deleteContactByRut = (req, res) => {
    const { rut } = req.params;

    Contact.deleteByRut(rut, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json('Error en el servidor');
        } else {
            res.status(200).json('Contacto eliminado exitosamente');
        }
    });
};

exports.autencicacionExitosa = (req, res) => {
    res.status(200).json('Autenticación exitosa');
};

