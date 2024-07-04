import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum ObjectCategory {
  CATHEDRAL = "CATHEDRAL",
  APARTMENT = "APARTMENT",
  COMPANY = "COMPANY",
  MONUMENT = "MONUMENT",
  OTHER = "OTHER",
}

export enum ObjectStatus {
  NEW = "NEW",
  REPORTED = "REPORTED",
  OK = "OK",
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
    status: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export interface ObjectData {
  _id: any;
  name: string;
  description: string;
  category: ObjectCategory;
  location: {
    place: string;
    country: string;
    coordinateLonLat: number[];
  };
  imageUrl?: string;
  status?: ObjectStatus;
}

const ObjectModel = mongoose.model<ObjectData>(
  "Object",
  objectSchema,
  "objects"
);

export default ObjectModel;
