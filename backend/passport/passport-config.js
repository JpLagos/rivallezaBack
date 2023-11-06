const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Importa el modelo de usuario que hayas creado


module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username', // Asegúrate de que coincida con el nombre del campo en tu formulario de inicio de sesión
                passwordField: 'password', // Asegúrate de que coincida con el nombre del campo en tu formulario de inicio de sesión
            },
            (username, password, done) => {
                User.getByUsername(username, (err, user) => {
                    if (err) throw err;
                    if (!user) {
                        return done(null, false, { message: 'Usuario no encontrado' });
                    }

                    // Comprueba si la contraseña es válida
                    User.verifyByPassword(user, password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Contraseña incorrecta' });
                        }
                    });
                });
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.getById(id, (err, user) => {
            done(err, user);
        });
    });
};
