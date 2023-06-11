import 'dotenv/config';
import 'module-alias/register';
import validateEnv from './utils/validateEnv';
import App from './app';
import UserController from './resources/user/user.controller';
import HomeController from './resources/home/home.controller';

validateEnv();

const app = new App(
    [new HomeController(), new UserController()],
    Number(process.env.PORT)
);
app.listen();
