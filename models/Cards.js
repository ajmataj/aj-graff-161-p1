import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema({
    name: {
        type: String,
        required = true
    },
    cardNum: {
        type: int,
        required: true,
        unique: true
    },
    expMonth: {
        type: int,
        required: true
    },
    expDay: {
        type: int,
        required: true
    }
});

const Card = mongoose.model('card', CardSchema);

export default Card;