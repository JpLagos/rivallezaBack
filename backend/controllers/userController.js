// // controllers/authController.js
// const User = require('../models/User');

// exports.registerUser = (req, res) => {
//     const { username, password, email } = req.body;

//     // Crea un nuevo usuario
//     const newUser = new User({ username, password, email });

//     User.createUser(newUser, (err) => {
//         if (err) {
//             console.error(err.message);
//             res.status(500).json('Error en el servidor');
//         } else {
//             res.redirect('/inicio-sesion');
//         }
//     });
// };

// exports.loginUser = (req, res) => {
//     // La autenticación de Passport ya se maneja en las rutas
//     // Si el usuario inicia sesión correctamente, se redirigirá a '/perfil'
//     // Si falla, se redirigirá a '/inicio-sesion' con un mensaje de error
// };

// exports.logoutUser = (req, res) => {
//     req.logout();
//     res.redirect('/');
// };
