const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware cors
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3456',
}));

// Configura las rutas de la API
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
