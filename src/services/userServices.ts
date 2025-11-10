import {
  ResetPasswordValues,
  SignInValues,
  SignUpValues,
} from "../utils/schema/user";
import * as userRepositories from "../repositories/userRepositories";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { email } from "zod";
import { mailtrap, sender } from "../utils/mailtrap";

export const signUp = async (data: SignUpValues, file: Express.Multer.File) => {
  const isEmailExist = await userRepositories.isEmailExist(data.email);

  if (isEmailExist > 1) {
    throw new Error("Email already registered");
  }
  const user = await userRepositories.createUser(
    {
      ...data,
      password: bcrypt.hashSync(data.password, 12),
    },
    file.filename
  );

  const token = jwt.sign({ id: user.id }, process.env.SECRET_AUTH ?? "", {
    expiresIn: "1 days",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo_url,
    token,
  };
};

export const signIn = async (data: SignInValues) => {
  const isEmailExist = await userRepositories.isEmailExist(data.email);

  if (isEmailExist === 0) {
    throw new Error("Email not registered");
  }

  const user = await userRepositories.findUserByEmail(data.email);

  if (!bcrypt.compareSync(data.password, user.password)) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_AUTH ?? "", {
    expiresIn: "1 days",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo_url,
    token,
  };
};

export const getEmailReset = async (email: string) => {
  const data = await userRepositories.createPasswordReset(email);

  await mailtrap.testing.send({
    from: sender,
    to: [{ email }],
    subject: "Reset your password",
    text: `Use this token to reset your password: ${data.token}`,
  });

  return true;
};

export const updatePassword = async (
  data: ResetPasswordValues,
  token: string
) => {
  const tokenData = await userRepositories.findPasswordResetByToken(token);

  if (!tokenData) {
    throw new Error("Invalid or expired token");
  }

  await userRepositories.updatePassword(
    tokenData.user.email,
    bcrypt.hashSync(data.password, 12)
  );

  await userRepositories.deletePasswordResetById(tokenData.id);

  return true;
};
