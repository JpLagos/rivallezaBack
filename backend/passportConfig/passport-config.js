// // passport-config.js
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/User'); // Reemplaza con el modelo de tu usuario

// passport.use(
//     new LocalStrategy((username, password, done) => {
//         User.getByUsername(username, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false, { message: 'Usuario no encontrado' });
//             }
//             if (!user.verifyPassword(password)) {
//                 return done(null, false, { message: 'Contraseña incorrecta' });
//             }
//             return done(null, user);
//         });
//     })
// );

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.getById(id, (err, user) => {
//         done(err, user);
//     });
// });

// module.exports = passport;
