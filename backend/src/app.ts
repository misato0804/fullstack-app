import express, {Application} from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import Controller from "./utils/interfaces/controller.interface";
import * as mongoose from "mongoose";
import {connection} from "mongoose";

class App {
    public express: Application;
    public port: number;

    constructor(controllers: [], port: number) {
        this.express = express();
        this.port = port;
        this.databaseConnection();
        this.initialControllers(controllers)
    }

    private initialMiddleware(): void {
        this.express.use(helmet);
        this.express.use(cors);
        this.express.use(morgan("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:true}));
    }

    private databaseConnection(): void {
        const DATA_BASE = process.env.MONGO_DATA_BASE!.replace("<password>", process.env.MONGO_USER_PASSWORD!);
        mongoose.connect( DATA_BASE)
            .then(connection => { console.log("connect successfully") })
            .catch(error => { console.log("ERROR: ",error.message) })
    }

    private initialControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.express.use("/", controller.router)
        })
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`)
        })
    }
}

export default App;