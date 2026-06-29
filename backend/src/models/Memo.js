import mongoose from "mongoose";

const memoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Memo = mongoose.model("Memo", memoSchema);

export default Memo;
