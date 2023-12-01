import mongoose from "mongoose";

const commonPropertiesSchema = new mongoose.Schema({
  // userRef : {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  description: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: {type : [String],default:[]},
  username : {type : String,required:true},
  author: { type: String, required: true },
  category : {type:String,required:true},
  location: {
    type: Object, // Specify the type as Object
    required: true,
    state: {
      type: String,
      required: true,
      trim : true
    },
    district: {
      type: String,
      required: true,
      trim : true
    },
  },
},{
  timestamps : true
});

const CarSchema = commonPropertiesSchema.discriminator("Car", {
  year: { type: Number, required: true },
  // fuel: { type: String, required: true },
  // transmission: { type: String, required: true },
  kmDriven: { type: Number, required: true },
});

const BikeSchema = commonPropertiesSchema.discriminator("Bike", {
  brand: { type: String, required: true },
  year: { type: String, required: true },
  kmDriven: { type: Number, required: true },
});

const mobileSchema = commonPropertiesSchema.discriminator("Mobile", {
  brand: { type: String, required: true },
});

const propertySchema = commonPropertiesSchema.discriminator("Property", {
  type: { type: String, required: true },
  bedrooms: { type: mongoose.Schema.Types.Mixed, required: true },
  bathrooms: { type: mongoose.Schema.Types.Mixed, required: true },
  furnishing: { type: String, required: true },
  constructionStatus: { type: String, required: true },
  listedBy: { type: String, required: true },
  superBuiltUpArea: { type: Number, required: true },
  carpetArea: { type: Number, required: true },
  maintenance: { type: Number, required: true },
  totalFloors: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  carParking: { type: mongoose.Schema.Types.Mixed, required: true },
  facing: { type: String, required: true },
  projectName: { type: String, required: true },
});

const PostModel =
  mongoose.models.Post || mongoose.model("Post", commonPropertiesSchema);
export default PostModel;
const CarModel = mongoose.models.Car || mongoose.model("Car", CarSchema);
const BikeModel = mongoose.models.Bike || mongoose.model("Bike", BikeSchema);
const MobileModel =
  mongoose.models.Mobile || mongoose.model("Mobile", mobileSchema);
const PropertyModel =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export { CarModel, BikeModel, MobileModel, PropertyModel };
