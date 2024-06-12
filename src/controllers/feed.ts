import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

import ObjectModel, { ObjectData } from "../models/object";
import { ResponseError } from "../utils/responseError";

export const addObject = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      "Validation failed, entered data is incorrect."
    ) as ResponseError;
    error.statusCode = 422;
    throw error;
  }

  const newObject = new ObjectModel<ObjectData>({ ...req.body });
  newObject
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Object created successfully!",
        newObject: newObject,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getObjects = (req: Request, res: Response, next: NextFunction) => {
  ObjectModel.find()
    .then((objects) => {
      res.status(200).json(objects);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getObject = (req: Request, res: Response, next: NextFunction) => {
  const objectId = req.params.objectId;
  ObjectModel.findById(objectId)
    .then((object) => {
      if (!object) {
        const error = new Error("Could not find object.") as ResponseError;
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(object);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

export const getCountries = (req: Request, res: Response, next: NextFunction) => {
  ObjectModel.find()
    .then((objects) => {
      const countries: string[] = [];
      objects.forEach(({location}) => {
        if (!countries.includes(location.country)) {
          countries.push(location.country);
        }
      })
      return countries;
    })
    .then((countries) => {
      res.status(200).json(countries);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
