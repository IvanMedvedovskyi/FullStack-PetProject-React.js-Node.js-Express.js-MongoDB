import React from "react";

const PostPopular = ({ post }) => {

  if(!post) {
    return (
      <div className="text-xl text-center text-white py-15">Постов не существует</div>
    )
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded mb-1 hover:bg-white hover:cursor-pointer hover:text-gray-800">
      <div className="text-sm">{post.title}</div>
    </div>
  );
};

export default PostPopular;
