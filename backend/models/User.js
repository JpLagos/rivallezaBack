const db = require('../database'); // Asegúrate de importar la base de datos correcta

const User = {
    getByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, row);
            }
        });
    },

    create: (user, callback) => {
        db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [user.username, user.password, user.email],
            (err) => {
                if (err) {
                    console.error(err.message);
                    callback(err);
                } else {
                    callback(null);
                }
            });
    },
    verifyByPassword: (user, password, callback) => {
        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
        if (user.password === password) {
            // Si las contraseñas coinciden, devuelve un valor verdadero (isMatch)
            callback(null, true);
        } else {
            // Si las contraseñas no coinciden, devuelve un valor falso (isMatch)
            callback(null, false);
        }
    },

    getById: (id, callback) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                console.error(err.message);
                callback(err);
            } else {
                callback(null, row);
            }
        });
    },

    // Agrega otros métodos para actualizar y eliminar usuarios si es necesario
};

module.exports = User;