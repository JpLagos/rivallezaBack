const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Ruta para obtener todos los contactos
router.get('/contacts', contactController.getAllContacts);
router.post('/contacts', contactController.createContact);
router.put('/contacts/:rut/update-asistencias', contactController.markAttendance);
router.delete('/contacts/:rut', contactController.deleteContactByRut);

// app.post('/registro', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/perfil',
//         failureRedirect: '/registro',
//         failureFlash: true, // Habilita mensajes flash en caso de falla de autenticación
//     })(req, res, next);
// });

// app.post('/inicio-sesion', (req, res, next) => {
//     passport.authenticate('local', {
//         successRedirect: '/perfil',
//         failureRedirect: '/inicio-sesion',
//         failureFlash: true,
//     })(req, res, next);
// });

// app.get('/cerrar-sesion', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

// function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/inicio-sesion');
// }

// app.get('/perfil', ensureAuthenticated, (req, res) => {
//     res.render('perfil'); // La ruta '/perfil' solo será accesible para usuarios autenticados
// });

// Otras rutas para crear, actualizar y eliminar contactos
// router.post('/contacts', contactController.createContact);
// router.put('/contacts/:id', contactController.updateContact);
// router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
