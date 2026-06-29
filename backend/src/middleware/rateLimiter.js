import ratelimit from "../config/upstash.js";

const rateLimiter = async (request, response, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");
    if (!success) {
      return response.status(429).json({
        message: "Too Many Requests!. Please Try Again Later.",
      });
    }
    next();
  } catch (error) {
    console.error("Rate Limit Error", error);
    next(error);
  }
};

export default rateLimiter;
