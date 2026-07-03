import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { sender, client } from "./mailtrapConfig.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify Your E-Mail",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
    });
    console.log("Email sent successfully!", response);
  } catch (error) {
    console.error("Error sending verification email!", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
