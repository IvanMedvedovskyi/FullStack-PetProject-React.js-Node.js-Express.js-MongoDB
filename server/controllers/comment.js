import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (!comment)
      return res.json({ message: "Пустой комментарий не может существовать" });

    const newComment = new Comment({ comment, author: req.userId });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }

    res.json({ newComment });
  } catch (error) {
    res.json({ message: "Что-то пошло не так" });
  }
};
