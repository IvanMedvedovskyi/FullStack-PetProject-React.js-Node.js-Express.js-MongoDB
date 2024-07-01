import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
};

export const createNewPost = createAsyncThunk(
  "post/createNewPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.error("Error creating new post:", error);
      throw error;
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatedPost = createAsyncThunk(
  "post/updatedPost",
  async ({ id, updatePost }) => {
    try {
      const { data } = await axios.put(`/posts/${id}`, updatePost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Create new post
      .addCase(createNewPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createNewPost.rejected, (state) => {
        state.isLoading = false;
      })
      //Get all posts
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.popularPosts = action.payload.popularPosts;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.isLoading = false;
      })
      //Delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.post?.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
      })
      //Edit post
      .addCase(updatedPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatedPost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts[index] = action.payload;
      })
      .addCase(updatedPost.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default postSlice.reducer;
