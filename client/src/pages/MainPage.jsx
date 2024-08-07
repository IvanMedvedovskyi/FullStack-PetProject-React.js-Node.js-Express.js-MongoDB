import React, { useEffect } from "react";
import PostItem from "../components/PostItem";
import PostPopular from "../components/PostPopular";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../redux/features/posts/postsSlice";
import { Link } from "react-router-dom";

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts?.length) {
    return (
      <div className="text-xl text-center text-white py-15">
        Постов не существует
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-sm uppercase font-bold text-white">
            Популярное:
          </div>
            {popularPosts?.map((post, idx) => (
              <Link key={idx} to={`${post._id}`}>
                  <PostPopular key={idx} post={post} />
              </Link>            
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
