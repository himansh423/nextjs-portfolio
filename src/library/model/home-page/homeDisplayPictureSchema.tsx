import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

interface IDisplayPicture extends Document {
  image:string;
  alt:string;
}

const homeDisplayPictureSchema = new Schema<IDisplayPicture>({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const HomeDisplayPicture:Model<IDisplayPicture> =
  mongoose.models.HomeDisplayPictures ||
  mongoose.model("HomeDisplayPictures", homeDisplayPictureSchema);
export default HomeDisplayPicture;
