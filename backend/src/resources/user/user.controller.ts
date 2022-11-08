import {Router, Request, Response, NextFunction} from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/Http.exception";
// import validationMiddleware
import validate from "./user.validation";
import UserService from "./user.service";
import authenticatedMiddleware from "../../middleware/authenticated.middleware";

// import authenticated from "../../middleware/"

class UserController implements Controller {
    public path = "/users";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoute();
    }

    private initialiseRoute(): void {
        this.router.post(`${this.path}/register`,this.register)
        this.router.post(`${this.path}/login`,this.login)
        this.router.get(`${this.path}/`, authenticatedMiddleware, this.getUser)
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.UserService.register(name, email, password);

            res.status(201).json({token})
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);
            res.status(201).json({token})
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    }

    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if(!req.user) {
            return next(new HttpException(404, "No logged in User"))
        }
        res.status(200).json({user: req.user})
    }
}

export default UserController;