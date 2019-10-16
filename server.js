import express from 'express';
import connectDatabase from './config/db';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

// API endpoints
app.get('/', (req, res) =>
    res.send('Hello, world')
);

// Connection listener
const port = 3000;
app.listen(port, () => console.log(`Express server running on port ${port}`));