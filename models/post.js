import { Schema, models, model } from "mongoose";

const postSchema = new Schema({
  title: String,
  subtitle: String,
  description: String,
  author: String,
  publishedAt: String,
  type: String,
  category: String,
  img: String,

  // title: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Please enter post title"],
  // },
  // subtitle: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Please enter post subtitle"],
  // },
  // description: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Please enter post description"],
  // },
  // author: {
  //   type: Object,
  //   default: {
  //     name: "Ramkumar Gurav",
  //     img: "/images/author/author1.jpg",
  //     designation: "CEO and Founder",
  //   },
  // },
  // img:{
  //   type:String,
  //   default:'/images/img1.jpg'
  // },
  // publishedAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
  // type: {
  //   type: String,
  //   trim: true,
  //   default:'latest'
  // },
  // category: {
  //   type: String,
  //   trim: true,
  //   required: [true, "Please enter post category"],
  // },
});

const Posts = models.post || model("post", postSchema);

export default Posts;
