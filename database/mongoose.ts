import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    } | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (!MONGODB_URI) throw new Error("MongoDB URI must be set within .env");

    // Reuse existing connection if available
    if (cached!.conn) return cached!.conn;

    if (!cached!.promise) {
        cached!.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (err) {
        cached!.promise = null;
        throw err;
    }

    if (process.env.NODE_ENV !== "production") {
        console.log(`Connected to database (${process.env.NODE_ENV})`);
    }

    return cached!.conn;
};

