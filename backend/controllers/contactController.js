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
    const { rut, nombre, numero, asistencia } = req.body;

    // Crear un nuevo objeto Contact con los datos
    const newContact = new Contact(rut, nombre, numero, asistencia);

    // Llamar al método estático "create" del modelo Contact
    Contact.create(newContact, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(201).send('Contacto creado exitosamente');
        }
    });
};

exports.updateAsistencia = (req, res) => {
    const { rut } = req.params;
    const { nuevaAsistencia } = req.body;

    // Validar que la nuevaAsistencia esté dentro del rango de 1 a 8
    if (nuevaAsistencia >= 1 && nuevaAsistencia <= 8) {
        Contact.updateAsistenciaByRut(rut, nuevaAsistencia, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Error en el servidor');
            } else {
                res.status(200).send('Asistencia actualizada exitosamente');
            }
        });
    } else {
        res.status(400).send('La nueva asistencia debe estar en el rango de 1 a 8');
    }
};

exports.deleteContactByRut = (req, res) => {
    const { rut } = req.params;

    Contact.deleteByRut(rut, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).send('Contacto eliminado exitosamente');
        }
    });
};
