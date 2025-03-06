import User from "../models/UsersModel.js";
import AppError from "../utils/AppError.js";

export const createUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await User.create({ username, password, email });

    res.status(201).json({
      status: "success",
      newUser,
    });
  } catch (e) {
    next(e);
  }
};

export const getAllUser = async (_req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (e) {
    next(e);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new AppError(404, "There is no user with that id");
    }
    res.status(200).json({ status: "success", data: user });
  } catch (e) {
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
    });
  } catch (e) {
    next(e);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const data = await User.findByIdAndUpdate(id, newData);
    res.status(200).json({ status: "success", data });
  } catch (e) {
    next(e);
  }
};
