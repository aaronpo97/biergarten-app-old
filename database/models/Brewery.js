import mongoose from 'mongoose';

const brewerySchema = mongoose.Schema({
  name: { type: String, required: true },
  beers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BeerPost' }],
  associatedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  location: {
    place_name: { type: String },
    geometry: {
      type: { type: String, enum: ['Point'] },
      coordinates: { type: [Number] },
    },
  },
  createdTimestamp: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Brewery = mongoose.model('Brewery', brewerySchema);

export default Brewery;
