"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mongo_exports = {};
__export(mongo_exports, {
  connect: () => connect
});
module.exports = __toCommonJS(mongo_exports);
var import_mongoose = __toESM(require("mongoose"));
var import_dotenv = __toESM(require("dotenv"));
import_mongoose.default.set("debug", true);
import_dotenv.default.config();
function getMongoURI(dbname) {
  let connection_string = `mongodb://localhost:27017/${dbname}`;
  const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER } = process.env;
  if (MONGO_USER && MONGO_PWD && MONGO_CLUSTER) {
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
function connect(dbname) {
  const uri = getMongoURI(dbname);
  import_mongoose.default.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
  import_mongoose.default.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });
  import_mongoose.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
  });
  const connectWithRetry = (attempt = 1, maxAttempts = 3) => {
    const options = {
      serverSelectionTimeoutMS: 3e4,
      socketTimeoutMS: 45e3,
      connectTimeoutMS: 3e4
    };
    import_mongoose.default.connect(uri, options).then(() => {
      console.log("MongoDB connection established");
    }).catch((error) => {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error.message);
      if (attempt < maxAttempts && error.message.includes("SSL") || error.message.includes("TLS")) {
        console.log(`Retrying connection (attempt ${attempt + 1}/${maxAttempts})...`);
        setTimeout(() => connectWithRetry(attempt + 1, maxAttempts), 2e3);
      } else {
        console.error("Error details:", error);
        console.error("\n=== SSL/TLS Error Troubleshooting ===");
        console.error("This error (SSL alert 80) is usually caused by:");
        console.error("\n1. IP ADDRESS NOT WHITELISTED (MOST COMMON):");
        console.error("   - Go to MongoDB Atlas \u2192 Network Access");
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connect
});
