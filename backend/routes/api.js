const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Ruta para obtener todos los contactos
router.get('/contacts', contactController.getAllContacts);
router.post('/contacts', contactController.createContact);
router.put('/contacts/:rut/update-asistencia', contactController.updateAsistencia);
router.delete('/contacts/:rut', contactController.deleteContactByRut);

// Otras rutas para crear, actualizar y eliminar contactos
// router.post('/contacts', contactController.createContact);
// router.put('/contacts/:id', contactController.updateContact);
// router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;
