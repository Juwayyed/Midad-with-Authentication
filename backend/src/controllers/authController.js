import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { generateVerificationToken } from "../utilities/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utilities/generateTokenAndSetCookie.js";

export const signup = async (request, response) => {
  const { email, password, name } = request.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All Fields Are Required!");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return response
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenAndSetCookie(response, user._id);
    response.status(201).json({
      success: true,
      message: "User Created Successfully!",
      user: {
        ...user._doc,
        password: null, //or undefined
      },
    });
  } catch (error) {
    response.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (request, response) => {
  response.send("Login Route");
};

export const logout = async (request, response) => {
  response.send("Logout Route");
};
