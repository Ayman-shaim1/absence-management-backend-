import asyncHandler from "express-async-handler";
import { Vonage } from "@vonage/server-sdk";

// @desc    send SMS
// @route   POST /api/sms/:to
// @access  private
export const sendSms = asyncHandler(async (req, res) => {
  try {
    const vonage = new Vonage({
      apiKey: "40c1ef08",
      apiSecret: "4Xh5AOUnNH14fnSy",
    });
    const from = "212644221260";
    const to = req.params.to;
    const text = req.body.text;
    await vonage.sms.send({ to, from, text });
    res.json({ message: "done" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
