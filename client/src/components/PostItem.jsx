import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <Link to={`/${post._id}`}>
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <div className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
        {post.imgUrl && (
          <img
            className="object-cover w-full"
            src={`http://localhost:3003/${post.imgUrl}`}
            alt="img"
          />
        )}
      </div>
      <div className="my-3 p-3">
        <div className="font-bold text-white text-xl mb-2">{post.title}</div>
        <p className="text-white opacity-65 text-base">{post.text}</p>
      </div>
      <div className="pt-4 pb-2 p-3">
        <span className="text-white text-sm">{post.username}</span>
        <span className="text-white opacity-65 text-sm float-right">
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </span>
      </div>
      <div className="flex gap-3 items-center pb-3 p-3">
        <button className="flex items-center justify-center gap-2 text-[15px] text-white opacity-50">
          <AiFillEye /> <span>{post.views}</span>
        </button>
        <button className="flex items-center justify-center gap-2 text-[15px] text-white opacity-50">
          <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
        </button>
      </div>
    </div>
    </Link>
  );
};

export default PostItem;
