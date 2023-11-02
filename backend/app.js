const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware cors
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passportConfig/passport-config');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'tu_secreto', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3456',
}));

// Configura las rutas de la API
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
