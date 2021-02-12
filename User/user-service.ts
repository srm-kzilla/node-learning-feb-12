import database from "../database-service";

export const addUserToDatabase = async (email: string, password: string) => {
  await (await database())
    .collection("user")
    .insertOne({ email: email, password: password });
};
