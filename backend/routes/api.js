const express = require('express');
const router = express.Router();
const passport = require('passport');
const contactController = require('../controllers/contactController');

// Ruta para obtener todos los contactos
router.get('/contacts', ensureAuthenticated, contactController.getAllContacts);
router.post('/contacts', contactController.createContact);
router.put('/contacts/:rut/update-asistencias', contactController.markAttendance);
router.delete('/contacts/:rut', contactController.deleteContactByRut);
router.get('/profile', (req, res) => {
    res.json({ message: 'Autenticado' });
});

// Ruta para registrar un usuario
router.post('/registro', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Ocurrió un error en la autenticación, puedes manejarlo aquí
            return res.status(500).json({ message: 'Error en la autenticación' });
        }
        if (!user) {
            // La autenticación falló, puedes devolver un mensaje de fallo
            return res.status(401).json({ message: 'Autenticación fallida' });
        }
        // La autenticación tuvo éxito, puedes devolver un mensaje de éxito
        return res.status(200).json({ message: 'Autenticación exitosa' });
    })(req, res, next);
});

router.post('/inicio-sesion', passport.authenticate('local', { failWithError: true }),
    function (req, res) {
        res.status(200).json({
            authenticated: req.isAuthenticated()
        });
    },
    function (err, req, res, next) {
        res.status(400).json({
            authenticated: req.isAuthenticated(),
            err: err.message
        });
    });

// Ruta para cerrar sesión
router.get('/cerrar-sesion', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'No estás autenticado' }); // Redirige al usuario a la página de inicio de sesión si no está autenticado
}
