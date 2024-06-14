import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum ObjectCategory {
  CATHEDRAL = "CATHEDRAL",
  APARTMENT = "APARTMENT",
  COMPANY = "COMPANY",
  NATURE = "NATURE",
  MONUMENT = "MONUMENT",
  OTHER = "OTHER",
}

const locationSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    coordinateLonLat: {
      type: [Number],
      required: true,
      validate: [(list: number[]) => list.length === 2],
    },
  },
  { _id: false }
);

const objectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [...Object.keys(ObjectCategory)],
    },
    location: {
      type: locationSchema,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export interface ObjectData {
  name: string;
  description: string;
  username: string;
  category: ObjectCategory;
  location: {
    place: string;
    country: string;
    coordinates: number[];
  };
  imageUrl?: string;
}

const ObjectModel = mongoose.model<ObjectData>("Object", objectSchema, "objects");

export default ObjectModel;
