const express = require("express");
const connectDB = require("./config/database");
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/userRoute');
const profileRoutes = require('./routes/profileRoute');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();


app.use('/products', productRoutes);
app.use('/auth', userRoutes);
// app.use('/profile', profileRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
