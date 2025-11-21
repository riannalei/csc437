// src/services/mongo.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

mongoose.set("debug", true);
dotenv.config();

function getMongoURI(dbname: string) {
  let connection_string = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;

  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
    // URL encode the password to handle special characters
    const encodedPassword = encodeURIComponent(MONGO_PWD);
    console.log(
      "Connecting to MongoDB at",
      `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${dbname}`
    );
    connection_string = `mongodb+srv://${MONGO_USER}:${encodedPassword}@${MONGO_CLUSTER}/${dbname}?retryWrites=true&w=majority`;
  } else {
    console.log("Connecting to MongoDB at ", connection_string);
  }
  return connection_string;
}

export function connect(dbname: string) {
  const uri = getMongoURI(dbname);
  
  // Handle connection events
  mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully");
  });
  
  mongoose.connection.on('error', (error) => {
    console.error("MongoDB connection error:", error);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected");
  });
  
  // Attempt connection with retry logic
  const connectWithRetry = (attempt: number = 1, maxAttempts: number = 3) => {
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    };
    
    mongoose
      .connect(uri, options)
      .then(() => {
        console.log("MongoDB connection established");
      })
      .catch((error) => {
        console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
        
        if (attempt < maxAttempts && error.message.includes('SSL') || error.message.includes('TLS')) {
          console.log(`Retrying connection (attempt ${attempt + 1}/${maxAttempts})...`);
          setTimeout(() => connectWithRetry(attempt + 1, maxAttempts), 2000);
        } else {
          console.error("Error details:", error);
          console.error("\n=== SSL/TLS Error Troubleshooting ===");
          console.error("This error (SSL alert 80) is usually caused by:");
          console.error("\n1. IP ADDRESS NOT WHITELISTED (MOST COMMON):");
          console.error("   - Go to MongoDB Atlas → Network Access");
          console.error("   - Click 'Add IP Address'");
          console.error("   - Add your current IP or use 0.0.0.0/0 for development");
          console.error("   - Wait 1-2 minutes for changes to propagate");
          console.error("\n2. Check MongoDB Atlas cluster status:");
          console.error("   - Ensure cluster is running (not paused)");
          console.error("   - Verify database user has correct permissions");
          console.error("\n3. Test connection string in MongoDB Compass:");
          console.error("   - Download MongoDB Compass");
          console.error("   - Try connecting with the same connection string");
          console.error("   - If Compass works but Node.js doesn't, it's a driver issue");
          console.error("\n4. Node.js/Driver compatibility:");
          console.error("   - Current Node.js version:", process.version);
          console.error("   - Try: npm install mongoose@latest");
          console.error("   - Or update Node.js to latest LTS");
          console.error("\n5. Network/Proxy issues:");
          console.error("   - Check if you're behind a corporate firewall");
          console.error("   - Try from a different network");
        }
      });
  };
  
  connectWithRetry();
}

