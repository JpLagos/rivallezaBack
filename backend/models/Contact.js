const db = require('../database');

class Contact {
    constructor(rut, nombre, numero, asistencias) {
        this.rut = rut;
        this.nombre = nombre;
        this.numero = numero;
        this.asistencias = 0;
    }

    //create static getByRut

    static getByRut(rut, callback) {
        db.get('SELECT * FROM contacts WHERE rut = ?', [rut], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, row);
            }
        });
    }

    static getAll(callback) {
        db.all('SELECT * FROM contacts', (err, rows) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    }
    //error callback is not a function
    static createContact(contact, callback) {
        db.run('INSERT INTO contacts (rut, nombre, numero, asistencias) VALUES (?, ?, ?, 0)', //TODO REVISAR POR QUE NO SE INSERTA CORRETAMENTE
            [contact.rut, contact.nombre, contact.numero],
            (err) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
    }
    static updateAsistenciasByRut = (rut, nuevaAsistencias, callback) => {
        db.run(
            'UPDATE contacts SET asistencias = asistencias + ? WHERE rut = ?',
            [nuevaAsistencias, rut],
            (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
    };

    // Método estático para eliminar un contacto por su rut
    static deleteByRut(rut, callback) {
        db.run('DELETE FROM contacts WHERE rut = ?', [rut], (err) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null);
            }
        });
    }

    static getAsistenciasByRut(rut, callback) {
        db.get('SELECT asistencias FROM contacts WHERE rut = ?', [rut], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                // El resultado de la consulta debe ser el número de asistencias actual del contacto
                const asistencias = row ? row.asistencias : 0;
                callback(null, asistencias);
            }
        });
    }


    // Puedes agregar métodos para actualizar y eliminar contactos si es necesario
}

module.exports = Contact;
