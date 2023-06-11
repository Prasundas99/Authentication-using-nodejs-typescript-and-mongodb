import HttpException from "@/utils/exceptions/HttpException";
import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";

export default class HomeController implements Controller {
    public path = '/';
    public router = Router();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.home);
    }

    private home = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            res.status(200).json({ message: 'Hello World' });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}