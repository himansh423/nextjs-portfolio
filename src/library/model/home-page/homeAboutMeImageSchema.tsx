import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

interface IHomeAboutImage extends Document {
  aboutImage: string;
}

const homeAboutMeImageSchema = new Schema<IHomeAboutImage>({
  aboutImage: {
    type: String,
    required: true,
  },
});

const HomeAboutImage: Model<IHomeAboutImage> =
  mongoose.models.HomeAboutImages ||
  mongoose.model("HomeAboutImages", homeAboutMeImageSchema);
export default HomeAboutImage;
