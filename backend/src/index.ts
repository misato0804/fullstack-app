import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.config.env' });
import App from "./app";
import UserController from "./resources/user/user.controller";

const app = new App([], Number(process.env.PORT))
app.listen();