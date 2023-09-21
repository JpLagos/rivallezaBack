const db = require('../database');

class Contact {
    constructor(rut, nombre, numero, asistencia) {
        this.rut = rut;
        this.nombre = nombre;
        this.numero = numero;
        this.asistencia = asistencia;
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

    static create(contact, callback) {
        db.run('INSERT INTO contacts (rut, nombre, numero, asistencia) VALUES (?, ?, ?, ?)',
            [contact.rut, contact.nombre, contact.numero, contact.asistencia],
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
    static updateAsistenciaByRut(rut, nuevaAsistencia, callback) {
        db.run('UPDATE contacts SET asistencia = ? WHERE rut = ?', [nuevaAsistencia, rut], (err) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null);
            }
        });
    }

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

    // Puedes agregar métodos para actualizar y eliminar contactos si es necesario
}

module.exports = Contact;
