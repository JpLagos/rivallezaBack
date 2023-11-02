// const db = require('../database');

// const User = {
//     getByUsername: (username, callback) => {
//         db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
//             if (err) {
//                 console.error(err.message);
//                 callback(err);
//             } else {
//                 callback(null, row);
//             }
//         });
//     },

//     getById: (id, callback) => {
//         db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
//             if (err) {
//                 console.error(err.message);
//                 callback(err);
//             } else {
//                 callback(null, row);
//             }
//         });
//     },

//     create: (user, callback) => {
//         db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [
//             user.username,
//             user.password,
//             user.email,
//         ],
//             (err) => {
//                 if (err) {
//                     console.error(err.message);
//                     callback(err);
//                 } else {
//                     callback(null);
//                 }
//             });
//     },
//     verifyPassword: (username, password, callback) => {
//         // Obtener el hash de la contraseña almacenada en la base de datos
//         db.get('SELECT password FROM users WHERE username = ?', [username], (err, row) => {
//             if (err) {
//                 console.error(err.message);
//                 return callback(err, false);
//             }
//             if (!row) {
//                 // Usuario no encontrado
//                 return callback(null, false);
//             }

//             // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
//             const storedPassword = row.password;
//             bcrypt.compare(password, storedPassword, (bcryptErr, result) => {
//                 if (bcryptErr) {
//                     console.error(bcryptErr.message);
//                     return callback(bcryptErr, false);
//                 }
//                 return callback(null, result);
//             });
//         });
//     },
// };
// // Otros métodos para actualizar y eliminar usuarios si es necesario

// module.exports = User;
