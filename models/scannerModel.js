import mongoose from "mongoose";

const scannerSchema = new mongoose.Schema(
  {
    currentlyActive: {
        type:Boolean,
        default:true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scanner", scannerSchema);
