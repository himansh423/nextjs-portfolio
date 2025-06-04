import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

interface IPhotoGallery extends Document {
  image: string;
}

const homePhotoGallerySchema = new Schema<IPhotoGallery>({
  image: {
    type: String,
    required: true,
  },
});

const HomePhotoGallery: Model<IPhotoGallery> =
  mongoose.models.HomePhotoGallery ||
  mongoose.model("HomePhotoGallery", homePhotoGallerySchema);
export default HomePhotoGallery;
