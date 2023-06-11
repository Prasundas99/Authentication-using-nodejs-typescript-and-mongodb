import express, {Application} from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Controller from "@/utils/interfaces/controller.interface";
import errorMiddleware from "./middlewares/errorMiddlewares"; 
import connectToDatabase from "./utils/database";


class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.databaseConnection();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private  initializeMiddlewares(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan("dev"));
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.express.use("/", controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private databaseConnection() {
       connectToDatabase();
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
};

export default App;

