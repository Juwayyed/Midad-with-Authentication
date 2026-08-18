import crypto from "crypto";
import bcryptjs from "bcryptjs";

import { User } from "../models/userModel.js";
import { generateVerificationToken } from "../utilities/generateVerificationToken.js";
import { generateTokenAndSetCookie } from "../utilities/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
} from "../mailtrap/emails.js";

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

    await sendVerificationEmail(user.email, verificationToken);
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

export const verifyEmail = async (request, response) => {
  const { code } = request.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return response.status(400).json({
        success: false,
        message: "Invalid or expired verification code!",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    response.status(200).json({
      success: true,
      message: "User verified successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in Verify Email!", error);
    response.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return response
        .status(400)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    generateTokenAndSetCookie(response, res._id);
    user.lastLogin = new Date();
    await user.save();

    response.status(200).json({
      success: true,
      message: "Logged In Successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error in Login!", error);
    response.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (request, response) => {
  response.clearCookie("token");
  response
    .status(200)
    .json({ success: true, message: "User Logged Out Successfully!" });
};

export const forgotPassword = async (request, response) => {
  const { email } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(400).json({
        success: false,
        message: "No user found! Check the email and try again!",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //One Hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );
    return response.status(200).json({
      success: true,
      message: "Password reset link sent successfully!",
    });
  } catch (error) {
    console.error("Error in forgotPassword", error);
    response.status(400).json({ success: false, message: error.message });
  }
};
