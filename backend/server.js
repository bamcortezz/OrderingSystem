const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes')

const connectDB = require('./config/database');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', UserRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on Port: ${PORT}`)
})