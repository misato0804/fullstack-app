import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/Http.exception";

function errorMiddleware (
    error: HttpException,
    req: Request,
    res: Response
) : void {
    const status = error.status || 500;
    const message = error.message || "something went wrong ";
    res.status(status).send({status, message})
}