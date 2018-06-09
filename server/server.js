// server.js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var authCtrl = require('./auth');
var middleware = require('./middleware');

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

// Importamos nuestros modelos, 
// en este ejemplo nuestro modelo de usuario
require('./models/user');

// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

// Rutas de autenticaci�n y login
router.post('/pages/signup', auth.emailSignup);
router.post('/pages/login', auth.emailLogin);

// Ruta solo accesible si est�s autenticado
router.get('/private',middleware.ensureAuthenticated, function(req, res) {...} );

// Iniciamos el servidor y la base de datos
mongoose.connect('mongodb://localhost', function(err) {
	// Comprobar errores siempre
    app.listen(app.get('port'), function(){
    	console.log('Express corriendo en http://localhost:3000');
    });
});