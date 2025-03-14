const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogs', { 
  serverSelectionTimeoutMS: 30000, 
});


const postSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = {
  getAllPosts: async () => await Post.find(),

  getPostById: async (id) => await Post.findOne({ id }),

  createPost: async (title, author, description) => {
    const newPost = new Post({ title, author, description });
    await newPost.save();
    return newPost;
  },

  updatePost: async (id, title, author, description) => {
    const post = await Post.findOne({ _id: id });
    if (!post) return null;
    post.title = title;
    post.author = author;
    post.description = description;
    await post.save();
    return post;
  },

  deletePost: async (id) => {
    const b = await Post.deleteOne({ _id: id });
    if (b.deletedCount === 0) return null;
    return b;
  },
};
