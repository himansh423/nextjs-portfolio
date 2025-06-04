import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

interface IDisplayPicture extends Document {
  image: string;
}

const homeDisplayPictureSchema = new Schema<IDisplayPicture>({
  image: {
    type: String,
    required: true,
  },
});

const HomeDisplayPicture: Model<IDisplayPicture> =
  mongoose.models.HomeDisplayPictures ||
  mongoose.model("HomeDisplayPictures", homeDisplayPictureSchema);
export default HomeDisplayPicture;
