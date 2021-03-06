import { NextFunction, Request, Response, Router } from "express";
import { addUserToDatabase, getUser, getUsers } from "./user-service";
import { schema } from "./user-schema";
import { ValidationError } from "yup";

const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const handleUserSignup = async (req: Request, res: Response) => {
  try {
    await addUserToDatabase(req.body.email, req.body.password);
    res.json({ success: true, message: "User added" });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const handleGetUser = async (req: Request, res: Response) => {
  try {
    let user_email = req.params.email;
    const result = await getUser(user_email);
    res.status(200).json({ data: result });
  } catch (err) {
    if (err.code)
      return res
        .status(err.code)
        .send({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const result = await getUsers();
    res.status(200).json({ data: result });
  } catch (err) {
    if (err.code)
      return res
        .status(err.code)
        .send({ success: false, message: err.message });
    res.status(500).json({ success: false, message: err.message });
  }
};

export const userRoute = () => {
  const app = Router();
  app.post("/", validate, handleUserSignup);
  app.get("/:email", handleGetUser);
  app.get("/", handleGetUsers);
  return app;
};

// get => validation over email as IdSchema
// post => validation over body as userSchema
