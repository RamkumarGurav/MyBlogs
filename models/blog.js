import { Schema, models, model } from "mongoose";

const blogSchema = new Schema({
   title: {
    type: String,
    trim: true,
    required: [true, "Please enter post title"],
  },
  subtitle: {
    type: String,
    trim: true,
    required: [true, "Please enter post subtitle"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please enter post description"],
  },
  author: {
    type: Object,
    default: {
      name: "Ramkumar Gurav",
      img: "/images/author/author1.jpg",
      designation: "CEO and Founder",
    },
  },
  img:{
    type:String,
    default:'/images/img1.jpg'
  },
  publishedAt: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    trim: true,
    default:'latest'
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Please enter post category"],
  },
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

const Blogs = models.blog || model("blog", blogSchema);
export default Blogs;
