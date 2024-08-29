import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { User } from "../models/user";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email already exists!" });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: { id: user.id },
    };

    return new Promise<Response>((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error(err.message);
            reject(res.status(500).send("Server error"));
          } else {
            resolve(res.json({ token }));
          }
        }
      );
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: { id: user.id },
    };

    return new Promise<Response>((resolve, reject) => {
      jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.error(err.message);
            reject(res.status(500).send("Server error"));
          } else {
            resolve(res.json({ token }));
          }
        }
      );
    });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};
