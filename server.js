import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Card from './models/Card';
import jwt from 'jsonwebtoken';
import config from 'config';

// Initialize express application
const app = express();

// Connect database
connectDatabase();

// Configure Middleware
app.use(express.json({ extended: false }));
const path = require('path');

// API endpoints
/**
 * @route GET /
 * @desc load webpage
 */
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname + '/index.html'))
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
        check('expYear', 'Please enter the expiration year (YY)').isInt().isLength({ min: 2, max: 2 }),
        check('cvv', 'Please enter the three-digit cvv').isInt().isLength({ min: 3, max: 3 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            const { name, cardNum, expMonth, expYear, cvv } = req.body;
            try {
                // Check if card exists
                let card = await Card.findOne({ cardNum: cardNum });
                if (card) {
                    return res
                        .status(400)
                        .json({ errors: [{ msg: 'Card number already exists' }] });
                }

                // Create new card
                card = new Card({
                    name: name,
                    cardNum: cardNum,
                    expMonth: expMonth,
                    expYear: expYear,
                    cvv: cvv
                });

                // Save to the db and return
                await card.save();
                res.send('Card successfully registered');
            } catch (error) {
                res.status(500).send('Server error');
            }
        }
    }
);

// Connection listener
const port = 3000;
app.listen(port, () => console.log(`Express server running on port ${port}`));