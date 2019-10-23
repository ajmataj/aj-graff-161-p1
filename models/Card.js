import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cardNum: {
        type: Number,
        required: true,
        unique: true
    },
    expMonth: {
        type: Number,
        required: true
    },
    expYear: {
        type: Number,
        required: true
    },
    cvv: {
        type: Number,
        required: true
    }
});

const Card = mongoose.model('card', CardSchema);

export default Card;