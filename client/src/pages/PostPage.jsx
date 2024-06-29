import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link, useParams } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const params = useParams();

  const fetchPostById = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPostById();
  }, [fetchPostById]);

  if (!post) {
    return <div>Загразка поста</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col mb-4">
        <button className="text-white rounded bg-gray-600 px-4 py-2 mb-4 w-[100px]">
          <Link to="/">Назад</Link>
        </button>
      </div>
      <div className="flex flex-row gap-8">
        {/* Main Content */}
        <div className="w-5/6 rounded overflow-hidden shadow-lg bg-gray-900">
          <div>
            <div className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
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
              <p className="text-white opacity-65 text-base">{post.text}</p>
            </div>
            <div className="pt-4 pb-2 px-5">
              <span className="text-white text-sm">{post.username}</span>
              <span className="text-white opacity-65 text-sm float-right">
                <Moment date={post.createdAt} format="D MMM YYYY" />
              </span>
            </div>
            <div className="flex gap-3 items-center pb-3 px-5">
              <button className="flex items-center justify-center gap-2 text-[15px] text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-[15px] text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
              </button>
            </div>
          </div>
        </div>
        {/* Comments Section */}
        <div className="w-1/6 rounded overflow-hidden shadow-lg bg-gray-800 p-4">
          <h2 className="text-white text-lg mb-2">Comments</h2>
          {/* {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-700 rounded">
                <div className="text-white font-bold">{comment.username}</div>
                <div className="text-white opacity-65">{comment.text}</div>
                <div className="text-white opacity-50 text-sm float-right">
                  <Moment date={comment.createdAt} format="D MMM YYYY" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-white opacity-65">No comments yet.</div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
