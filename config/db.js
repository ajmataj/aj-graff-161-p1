import mongoose from 'mongoose';
import config from 'config';

const mongo = require('mongodb').MongoClient;

// Get connection string
const db = config.get('mongoURI');

// Connect to to MongoDB
const connectDatabase = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error.message);

        // Exit with failure code
        process.exit(1);
    }
};

// Insert data into database
const insertData = async (info) => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log('Inserting data to MongoDB...');
        const database = client.db('People');
        const collection = database.collection('Cards');
        collection.insertOne({info}, (err, result) => {});
        collection.find().toArray((err, items) => {
            console.log(items)
        });
    } catch (error) {
        console.error(error.message);

        // Exit with failure code
        process.exit(1);
    }
};

export default connectDatabase;