import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

interface IHomeConnectionsImage extends Document {
  connectionsImage: string;
}

const homeConnectionsImageSchema = new Schema<IHomeConnectionsImage>({
  connectionsImage: {
    type: String,
    required: true,
  },
});

const HomeConnectionsImage: Model<IHomeConnectionsImage> =
  mongoose.models.HomeConnectionsImages ||
  mongoose.model("HomeConnectionsImage", homeConnectionsImageSchema);
export default HomeConnectionsImage;
