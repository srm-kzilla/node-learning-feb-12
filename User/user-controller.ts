import { Request, Response, Router } from "express";
import { addUserToDatabase } from "./user-service";
import { schema } from "./user-schema";

const userSignup = async (req: Request, res: Response) => {
  try {
    await schema.validate(req.body);
    await addUserToDatabase(req.body.email, req.body.password);
    res.json({ success: true, message: "User added" });
  } catch (err) {
    // LoggerInstance.error(err)
    console.error(err.message);
    res.status(500).json({ success: false, message: "Cannot add user" });
  }
};

export const userRoute = () => {
  const app = Router();
  app.post("/", userSignup);
  return app;
};
