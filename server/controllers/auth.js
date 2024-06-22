import UserSchema from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Registration
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUserUsed = await UserSchema.findOne({ username });
    if (isUserUsed) {
      return res.json({ message: "Данное имя пользователя занято" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new UserSchema({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    res.json({ message: "При регистрация что-то пошло не так :(" });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserSchema.findOne({ username });

    if (!user)
      return res.json({ message: "Данного пользователя не существует." });

    const isValidPassword = bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.json({ message: "Неверный логин или пароль." });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "Авторизация прошла успешно"
    });
  } catch (error) {
    console.log(error);
  }
};

//Get me Info
export const getMe = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.userId);

    if (!user)
      return res.json({ message: "Такого пользователя не существует." });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
      message: "Вы вошли в систему"
    });
  } catch (error) {
    res.json({ message: "Нет доступа." });
  }
};
