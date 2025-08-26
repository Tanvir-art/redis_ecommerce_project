// src/server.ts
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";
import { redisClient, connectRedis } from "./app/config/redis";

async function startServer() {
    try {
        // 1️ Connect MongoDB
        await mongoose.connect(config.database_url as string);
        console.log("✅ Connected to MongoDB");

        // 2️ Connect Redis
        await connectRedis();
        console.log("✅ Connected to Redis");

        // 3️ Basic Express route
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });

        // 4️ Start server
        app.listen(config.port || 3000, () => {
            console.log(`🚀 Server running at http://localhost:${config.port || 3000}`);
        });
    } catch (error) {
        console.error("❌ Error starting server:", error);
        process.exit(1);
    }
}

startServer();
