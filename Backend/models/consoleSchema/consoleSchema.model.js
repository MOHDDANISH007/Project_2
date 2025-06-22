import mongoose from "mongoose";

const consoleSchema = new mongoose.Schema({
  Type: String, // e.g., "Console"
  console_id: Number,
  console_name: String,
  price_inr: Number,
  images_by_color: {
    type: Map,
    of: String // This allows multiple colors as keys and image URLs as values
  }
});

const ConsoleSchema = mongoose.model("Console", consoleSchema);
export default ConsoleSchema;
