import userModel from "@/resources/user/user.model";

declare module 'express-serve-static-core' {
  interface Request {
    user?: typeof userModel;
  }
}
