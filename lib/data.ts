import { PostInterface, UserInterface } from "./types";
export const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["clean"],
  ],
};
export const posts: PostInterface[] = [
  {
    _id: "1",
    image: "/assets/hero.jpg",
    title: "Title 1",
    desc: "deckodow wewoewiow Lorsfsfsf ffsfs",
    noOfLikes: 20,
    noOfComments: 45,
    user: {
      createdAt: "",
      _id: "1",
      fullName: "Felona Adams",
      bio: "Good girl",
      image: "/assets/hero.jpg",
      email: "good@gmail.com",
    },
  },
  {
    _id: "2",
    image: "/assets/hero.jpg",
    title: "Title 1",
    desc: "deckodow wewoewiow Lorsfsfsf ffsfs",
    noOfLikes: 20,
    noOfComments: 45,
    user: {
      createdAt: "",
      _id: "1",
      fullName: "Felona Adams",
      bio: "Good girl",
      image: "/assets/hero.jpg",
      email: "good@gmail.com",
    },
  },
  {
    _id: "3",
    image: "/assets/hero.jpg",
    title: "Title 1",
    desc: "deckodow wewoewiow Lorsfsfsf ffsfs",
    noOfLikes: 20,
    noOfComments: 45,
    user: {
      createdAt: "",
      _id: "1",
      fullName: "Felona Adams",
      bio: "Good girl",
      image: "/assets/hero.jpg",
      email: "good@gmail.com",
    },
  },
];
export const users: UserInterface[] = [
  {
    _id: "1",
    fullName: "Felona Adams",
    bio: "Good girl",
    image: "/assets/hero.jpg",
    email: "good@gmail.com",
    createdAt: "",
  },
  {
    _id: "2",
    fullName: "Felona Adams",
    bio: "Good girl",
    image: "/assets/hero.jpg",
    email: "good@gmail.com",
    createdAt: "",
  },
  {
    _id: "3",
    fullName: "Felona Adams",
    bio: "Good girl",
    image: "/assets/hero.jpg",
    email: "good@gmail.com",
    createdAt: "",
  },
];
