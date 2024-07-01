import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatedPost } from "../redux/features/posts/postsSlice";

const EditPostPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [image, setNewImage] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setOldImage(data.imgUrl);
    setTitle(data.title);
    setText(data.text);
  }, [params.id]);

  const submitHandler = () => {
    try {
      const updatePost = new FormData();
      updatePost.append("id", params.id);
      updatePost.append("image", image);
      updatePost.append("title", title);
      updatePost.append("text", text);

      dispatch(updatedPost({ id: params.id, updatePost }));
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  const clearFormData = () => {
    setTitle("");
    setText("");
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Редактирование поста</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6 flex">
          <label className="bg-gray-600 w-full flex justify-center hover:bg-gray-500 cursor-pointer text-white font-bold py-2 px-14 rounded border-2 border-dotted cursor-pointercursor-pointer">
            Изменить изображение
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                setNewImage(e.target.files[0]);
                setOldImage("");
              }}
            />
          </label>
        </div>
        <div className="flex object-cover py-2">
          {oldImage && (
            <img
              src={`http://localhost:3003/${oldImage}`}
              alt={oldImage.name}
            />
          )}
          {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Введите заголовок"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Содержимое
          </label>
          <textarea
            id="content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Введите содержимое"
            required
          ></textarea>
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            onClick={submitHandler}
            className="bg-blue-500 mr-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Изменить пост
          </button>
          <button onClick={clearFormData} className="flex bg-red-600 font-bold text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
