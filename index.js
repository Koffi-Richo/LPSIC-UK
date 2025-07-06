// npm install cookie-parser express-session csurf swagger-ui-express swagger-jsdoc


const express = require("express");
const connectDB = require("./config/database");
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const profileRoutes = require('./routes/profileRoute');
// const cookieParser = require('cookie-parser');  // Pour les cookies
// const session = require('express-session'); // Pour les sessions
// // CSRF protection
// const csrf = require('csurf');



// const { swaggerSpec, swaggerUI } = require("./config/swagger");
const { swaggerUI, swaggerSpec } = require("./config/swagger");







const cors = require('cors');

const auth = require('./middleware/auth');
const cleanData = require('./middleware/cleanData');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Definir les origines autorisées
const corsOptions = {
    origin: 'https://togotulawo.tg, https://universitedekara.tg',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};




// Connect to the database
connectDB();


// Utiliser le middleware CORS avec les options définies
app.use(cors(corsOptions));

// Utilisez le middleware de nettoyage des données
// app.use(cleanData);


// Routes
app.use('/products', productRoutes);

// Si je veux utiliser le middleware auth sur les produits, je dois le mettre avant les routes
// app.use('/products', auth, productRoutes);


app.use('/auth', userRoutes);


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
    explorer: true,
    customCssUrl: '/extras/swagger.css',
    customJsUrl: '/extras/swagger.js',
    customSiteTitle: 'API Documentation',
    customfavIcon: '/extras/favicon.ico',
    swaggerUrl: '/api-docs/swagger.json',
    customCss: '.swagger-ui .topbar { display: none }',
    
}));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
