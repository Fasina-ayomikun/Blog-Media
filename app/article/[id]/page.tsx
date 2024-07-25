"use client";
import AuthorDetails from "@/components/AuthorDetails";
import Comments from "@/components/Comments";
import Navbar from "@/components/Navbar";
import { deleteBlog, getBlog } from "@/lib/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  BlogInterface,
  parsedToken,
  parsedUser,
  UserInterface,
} from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";

const Post = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogInterface[]>([]);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    isError,
    isLoading,
    likers,
    title,
    subtitle,
    noOfComments,
    tags,
    noOfLikes,
    content,
    bannerImg,
    writer,
  } = useAppSelector((state) => state.blogSlice);
  const { blogs } = useAppSelector((state) => state.allBlogsSlice);
  const [isLikedBlog, setIsLikedBlog] = useState("");
  const toggleLike = async () => {
    try {
      const resp = await axios.get(`/api/like/${id}`, {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      });
      if (resp.status === 200) {
        dispatch(getBlog(id));
        setIsLikedBlog(resp.data.blogId);
      }
      console.log("like", resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getBlog(id));
  }, []);
  useEffect(() => {
    if (blogs.length > 1) {
      setFilteredBlogs((prevBlog) => {
        const tempBlog = blogs.filter(
          (blog: BlogInterface) => blog.writer?._id !== writer._id
        );
        console.log(tempBlog, blogs);

        return tempBlog;
      });
    }
  }, [blogs]);
  return (
    <section className='relative'>
      <Navbar />
      <Comments setOpen={setOpen} blogId={id} open={open} />
      <section className='container py-6 px-4'>
        <div className='flex items-center justify-between gap-3'>
          <div>
            <h1 className='text-4xl font-bold my-3'>{title}</h1>
            <p className='text-md text-gray-500'>{subtitle}</p>
          </div>
          <div className='relative '>
            <MdMoreHoriz
              className='text-2xl text-gray-500 cursor-pointer'
              onClick={() => setOpenModal(!openModal)}
            />
            {openModal && (
              <div className='rounded-md px-3 py-2 absolute top-6 bg-white shadow-lg shadow-neutral-300 w-36 -right-4'>
                <p
                  className='text-sm my-1 cursor-pointer'
                  onClick={() => {
                    setOpenModal(false);
                    router.push(`
                            /author/${writer?._id}
                          `);
                  }}
                >
                  View Author
                </p>
                {writer._id === parsedUser?._id && (
                  <>
                    <p
                      className='text-sm my-1 cursor-pointer'
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      <Link href={`/write/${id}`}>Edit Article</Link>
                    </p>
                    <p
                      className='text-sm my-1 cursor-pointer'
                      onClick={() => {
                        setOpenModal(false);
                        dispatch(deleteBlog(id));
                        router.push("/");
                      }}
                    >
                      {" "}
                      Delete Article
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {bannerImg && (
          <div className='relative w-full h-96 my-7'>
            <Image
              src={bannerImg}
              alt='Banner'
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <p className='text-sm text-gray-500 '>Tags: {tags.join(",")}</p>

        {/* FIXME: Fix content */}
        <div
          className='w-4/6 mx-auto blog'
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <div className='flex items-center gap-3  w-4/6 mx-auto my-6'>
          <p
            onClick={toggleLike}
            className='cursor-pointer text-sm flex items-center gap-2'
          >
            {parsedUser && likers.includes(parsedUser?._id) ? (
              <FaHeart className='text-red-700' />
            ) : (
              <FaRegHeart className='text-gray-700' />
            )}
            {noOfLikes} like
            {noOfLikes > 1 && "s"}
          </p>
          <p
            className='text-sm flex items-center gap-2 cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <FaComment /> {noOfComments} comment
            {noOfComments > 1 && "s"}
          </p>
        </div>

        {filteredBlogs.length > 1 && (
          <div>
            <h3 className='text-2xl font-semibold mb-5'>
              Related articles or posts
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-8'>
              {filteredBlogs.length > 1 &&
                filteredBlogs
                  .slice(0, 6)
                  .map((article: BlogInterface, index) => {
                    return (
                      <div className='w-full'>
                        {article.bannerImg && (
                          <Image
                            onClick={() => {
                              router.push(`/article/${article._id}`);
                            }}
                            src={article.bannerImg}
                            alt='posts'
                            width={400}
                            height={400}
                            style={{
                              width: "100%",
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <h4 className='text-md font-semibold mt-3'>
                          {article.title}
                        </h4>
                        <p className='text-sm text-gray-500 lowercase'>
                          @{article.writer?.fullName}
                        </p>
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
        <AuthorDetails text='Written by' />
      </section>
    </section>
  );
};

export default Post;
