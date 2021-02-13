import database from "../database-service";

export const addUserToDatabase = async (email: string, password: string) => {
  await (await database())
    .collection("user")
    .insertOne({ email: email, password: password });
};

export const getUser = async (user_email: string) => {
  const user = await (await database())
    .collection("user")
    .findOne({ email: user_email });
  if (!user) throw { code: 404, message: "User not found" };
  return user;
};

export const getUsers = async () => {
  return await (await database()).collection("user").find().toArray();
};
