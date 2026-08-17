import { MailtrapClient } from "mailtrap";
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
      category: "E-mail Verification",
    });
    console.log("Email sent successfully!", response);
  } catch (error) {
    console.error("Error sending verification email!", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, username) => {
  const recipient = [{ email }];
  try {
    const response = await MailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "08cf15c7-8f2b-4c9b-8f91-52e816c5bee3",
      template_variables: {
        company_info_name: "Midad",
        name: username,
      },
    });
    console.log("Email sent successfully!", response);
  } catch (error) {
    console.error("Error sending welcome email!", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};
