import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from '../models/Comment.js'
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const createNewPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });

    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });

    res.json(newPostWithoutImage);
  } catch (error) {
    res.json({ message: "При создании поста произошла ошибка" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return res.json({ message: "Постов нет" });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    console.log({ message: "Не удалось получить посты" });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(post);
  } catch (error) {
    res.json({ message: "Пост не найден" });
  }
};

export const getOwnPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    res.json(list);
  } catch (error) {
    console.error(error); // Добавление вывода ошибки в консоль для отладки
    res.status(500).json({ message: "Личные посты не найдены" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.json({ message: "Пост отсутствует" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: "Пост был удалён" });
  } catch (error) {
    res.json({ message: "Что-то пошло не так" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const {title, text, id} = req.body

    const post = await Post.findById(id)

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
      post.imgUrl = fileName || ""
    }

    post.title = title
    post.text = text

    await post.save()

    res.json(post)
  } catch (error) {
    res.json({message: "Что-то пошло не так"})
  }
};

export const getCommentToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    console.log(post)

    if(!post) return res.json({message: "Нет такого поста"})

      const commentsList = await Promise.all(
        post.comments.map(async (comment) => {
          try {
            const foundComment = await Comment.findById(comment)
            return foundComment
          } catch (error) {
            console.log(`Ошибка при получении комментария с ID ${comment}:`, error)
            throw error
          }
        })
      )
      

    res.json(commentsList)
  } catch (error) {
    res.json({message: "Не удалось получить комментарии"})
  }
}
