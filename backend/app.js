import express from "express";
import { createServer} from "node:http";

import {Server} from "socket.io";
import mongoose from "mongoose";
import {connectToSocket} from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 3000));
app.use(cors());
app.use(express.json ({limit: "40kb"}));
app.use(express.urlencoded({extended: true, limit: "40kb"}));

app.use("/api/v1/users", userRoutes);

const start = async ()=>{
    const connectionDb  = await mongoose.connect("mongodb+srv://easemeet:easy@cluster7.afn8oxd.mongodb.net/"); 
    console.log(`MONGO CONNECTED TO DB HOST : ${connectionDb.connection.host}`);
   server.listen(app.get("port"), ()=>{
    console.log("server is running on the port 3000");
   });

}
start();




