import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/features/posts/postsSlice";
import { toast } from "react-toastify";
import {
  createPost,
  getPostComments,
} from "../redux/features/comment/commentSlice";
import CommentItem from "../components/CommentItem";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPostById = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  const deletePostHandler = useCallback(async () => {
    await dispatch(deletePost(params.id));
    navigate("/");
    toast("Пост был успешно");
  }, [params.id, dispatch, navigate]);

  const createCommentHandler = useCallback(async () => {
    const postId = params.id;
    await dispatch(createPost({ postId, comment }));
    setComment("");
    fetchComments()
  }, [params.id, comment, dispatch, fetchComments]);

  useEffect(() => {
    fetchPostById();
  }, [fetchPostById]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return <div>Загразка поста</div>;
  }

  return (
    <div className="max-w-full mx-auto flex flex-col">
      <div className="flex flex-col mb-4">
        <button className="text-white rounded bg-gray-600 px-4 py-2 mb-4 w-[100px]">
          <Link to="/">Назад</Link>
        </button>
      </div>
      <div className="flex flex-row gap-8">
        {/* Main Content */}
        <div className="w-4/6 rounded overflow-hidden shadow-lg bg-gray-900">
          <div>
            <div
              className={
                post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post.imgUrl && (
                <img
                  className="object-cover w-full"
                  src={`http://localhost:3003/${post.imgUrl}`}
                  alt="img"
                />
              )}
            </div>
            <div className="my-3 px-5">
              <div className="font-bold text-white text-xl mb-2">
                {post.title}
              </div>
              <p className="text-white opacity-65 text-base break-words">
                {post.text}
              </p>
            </div>
            <div className="pt-4 pb-2 px-5">
              <span className="text-white text-sm">{post.username}</span>
              <span className="text-white opacity-65 text-sm float-right">
                <Moment date={post.createdAt} format="D MMM YYYY" />
              </span>
            </div>
            <div className="flex justify-between gap-3 items-center pb-3 px-5">
              <div className="flex gap-2 mt-4">
                <button className="flex items-center justify-center gap-2 text-[15px] text-white opacity-50">
                  <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-[15px] text-white opacity-50">
                  <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                </button>
              </div>
              {user?._id === post?.author && (
                <div className="flex items-center justify-center gap-4">
                  <Link
                    to={`/${params.id}/edit`}
                    className="flex items-center justify-center gap-2 text-[20px] text-white opacity-50"
                  >
                    <AiTwotoneEdit />
                  </Link>
                  <button
                    onClick={deletePostHandler}
                    className="flex items-center justify-center gap-2 text-[20px] text-white opacity-50"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Comments Section */}
        <div className="w-2/6 rounded overflow-hidden shadow-lg bg-gray-800 p-4">
          <form
            className="flex gap-4 items-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-3/5 p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <button
                type="submit"
                onClick={createCommentHandler}
                className="self-end bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300"
              >
                Отправить
              </button>
            </div>
          </form>

          {
            comments?.map((cmt) => (
              <CommentItem key={cmt?._id} cmt={cmt} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default PostPage;
