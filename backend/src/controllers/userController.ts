import Users from "../models/users";
import { Request, Response, NextFunction } from "express";

export const GetVersion = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    version: "1.0.0"
  });
};

/* Save User */
export let SaveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const Name = req.body.name;
  const Email = req.body.email;
  const Address = req.body.address;
  const Dob = req.body.dob;

  const userDetails = new Users({
    name: Name,
    email: Email,
    address: Address,
    dob: Dob
  });

  try {
    const userRes = await Users.find({ email: Email });
    if (userRes[0] === undefined) {
      const response = await userDetails.save();
      res.status(200).json({
        success: true,
        message: "User inserted successfully",
        data: response
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Email already exists!"
      });
    }
  } catch (err) {
    console.log("Error in insertion of user: " + err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/* Get All Users */
export let GetAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Users.find();
    res.status(200).json({
      success: true,
      message: "All users found successfully",
      data: response
    });
  } catch (err) {
    console.log("Error in finding selected user: " + err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/* Get Selected User */
export let GetSelectedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Users.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Selected user found!",
      data: response
    });
  } catch (err) {
    console.log("Error in finding selected user: " + err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/* Update User */
export let UpdateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Users.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      address: req.body.address,
      dob: req.body.dob
    });

    const getUser = await Users.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: getUser
    });
  } catch (err) {
    console.log("Error in updating selected user: " + err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

/* Delete User */
export let DeleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: response
    });
  } catch (err) {
    console.log("Error in deleted selected user: " + err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
