import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscriber =
  mongoose.models.Subscribers ||
  mongoose.model("Subscribers", subscriberSchema);
export default Subscriber;
