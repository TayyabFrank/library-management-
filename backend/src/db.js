import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const {
            MONGO_DB_tayyab,
            MONGO_DB_frank,
            MONGO_DB_tayyab1,
            MONGO_DB_tayyab2,
        } = process.env;

        if (!MONGO_DB_tayyab || !MONGO_DB_frank || !MONGO_DB_tayyab1 || !MONGO_DB_tayyab2) {
            throw new Error(
                'Missing required MongoDB environment variables. Please ensure MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_CLUSTER, and MONGO_DB_NAME are defined in your .env file.'
            );
        }

        const encodedUsername = encodeURIComponent(MONGO_DB_USERNAME);
        const encodedPassword = encodeURIComponent(MONGO_DB_PASSWORD);

        const MONGO_DB_URI = `mongodb+srv://${encodedUsername}:${encodedPassword}@${MONGO_DB_CLUSTER}.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

        await mongoose.connect(MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('👏 Successfully connected to MongoDB');
    } catch (error) {
        console.error('😞 Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
