import React, { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import PostItem from '../components/PostItem'

const AllPostPage = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts)

  const fetchGetOwnPosts = useCallback(async () => {
    try {
      const { data } = await axios.get("/posts/user/getmyposts");
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    fetchGetOwnPosts()
  }, [])

  if(!posts) {
    return (
      <div className="text-xl text-center text-white py-15">Постов не существует</div>
    )
  }

  return <div className="flex w-full justify-center p-4">
    {posts?.map((post, idx) => <PostItem key={idx} post={post} />)}
  </div>
};

export default AllPostPage;
