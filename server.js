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

/**
 * @route POST api/cards
 * @desc Register cards
 */
app.post('/api/cards', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Connection listener
const port = 3000;
app.listen(port, () => console.log(`Express server running on port ${port}`));