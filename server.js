import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({ extended: false }));

// API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) =>
    res.send('Hello, world')
);

/**
 * @route POST api/cards
 * @desc Register cards
 */
app.post(
    '/api/cards',
    [
        check('name', 'Please enter your name').not().isEmpty(),
        check('cardNum', 'Please enter the 16 digit credit card number').isInt().isLength(16),
        check('expMonth', 'Please enter the expiration month (MM)').isInt().isLength({ min: 2, max: 2 }),
        check('expYear', 'Please enter the expiration year (YY)').isInt().isLength({ min: 2, max: 2 })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            return res.send(req.body);
        }
    }
);

// Connection listener
const port = 3000;
app.listen(port, () => console.log(`Express server running on port ${port}`));