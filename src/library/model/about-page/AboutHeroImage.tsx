import mongoose, { Document, Model } from "mongoose";
const { Schema } = mongoose;

interface IAboutHeroImage extends Document {
  image: string;
}

const aboutHeroImageSchema = new Schema<IAboutHeroImage>({
  image: {
    type: String,
    required: true,
  },
});

const AboutHeroImage: Model<IAboutHeroImage> =
  mongoose.models.AboutHeroImage ||
  mongoose.model("AboutHeroImage", aboutHeroImageSchema);
export default AboutHeroImage;
