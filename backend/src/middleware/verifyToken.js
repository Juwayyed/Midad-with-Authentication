import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    return response
      .status(401)
      .json({ success: false, message: "Unauthorized!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return response
        .status(401)
        .json({ success: false, message: "Unauthorized!" });
    }
    request.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in verifying", error);
    return response
      .status(500)
      .json({ success: false, message: "Server Error!" });
  }
};
