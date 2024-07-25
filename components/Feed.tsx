"use client";
import SingleFeed from "@/mini-components/SingleFeed";
import { BlogInterface, PostInterface, parsedUser } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { FaComment, FaHeart } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";
import { AriaAttributes, DOMAttributes, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getAllBlogs } from "@/lib/features/all-blogs/allBlogsSlice";
import moment from "moment";
import { useRouter } from "next/navigation";
import { deleteBlog } from "@/lib/features/blog/blogSlice";

const Feed: React.FC = () => {
  const [openModal, setOpenModal] = useState({ id: "", open: false });
  const { isLoading, blogs } = useAppSelector((state) => state.allBlogsSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(getAllBlogs({}));
  }, []);
  return (
    <div className='col-span-3 w-full  px-4 lg:px-0 '>
      {blogs.map((blog: BlogInterface) => {
        return (
          <div key={blog._id} className='blog flex items-start gap-4 mt-5'>
            {blog?.writer?.image && (
              <div className='relative w-10 aspect-square'>
                <Image
                  src={blog?.writer?.image}
                  alt={blog.writer?.fullName}
                  fill
                  className='aspect-square rounded-full object-cover'
                ></Image>
              </div>
            )}
            <div className='mt-2 w-full border-b-[1px] border-gray-400 pb-5'>
              <div className='flex items-center justify-between gap-4 my-4'>
                <p className='flex flex-col items-start text-md font-semibold '>
                  {blog.writer?.fullName}{" "}
                  <span className='font-light text-gray-400 text-sm'>
                    {moment(blog.createdAt).fromNow()}{" "}
                  </span>
                </p>
                <div className='relative '>
                  <MdMoreVert
                    className='text-2xl z-40 text-gray-500 cursor-pointer'
                    onClick={() =>
                      setOpenModal({
                        id: blog._id,
                        open: !openModal.open,
                      })
                    }
                  />
                  {openModal.id === blog._id && openModal.open && (
                    <div className='rounded-md px-3 py-2 absolute top-6 bg-white shadow-lg shadow-neutral-300 w-36 -right-4'>
                      <p
                        className='text-sm my-1 cursor-pointer'
                        onClick={() => {
                          setOpenModal({
                            id: "",
                            open: false,
                          });
                          router.push(`
                            /author/${blog.writer?._id}
                          `);
                        }}
                      >
                        View Author
                      </p>
                      <p
                        className='text-sm my-1 cursor-pointer'
                        onClick={() => {
                          setOpenModal({
                            id: "",
                            open: false,
                          });
                          router.push(`/article/${blog._id}`);
                        }}
                      >
                        {" "}
                        Read Article
                      </p>
                      {blog.writer?._id === parsedUser?._id && (
                        <>
                          <p
                            className='text-sm my-1 cursor-pointer'
                            onClick={() => {
                              setOpenModal({
                                id: "",
                                open: false,
                              });
                            }}
                          >
                            <Link href={`/write/${blog._id}`}>
                              Edit Article
                            </Link>
                          </p>
                          <p
                            className='text-sm my-1 cursor-pointer'
                            onClick={() => {
                              setOpenModal({
                                id: "",
                                open: false,
                              });
                              dispatch(deleteBlog(blog._id));
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
              {blog.bannerImg && (
                <div className='relative -z-10 rounded-sm mb-5 w-full h-96 '>
                  <Image
                    src={blog.bannerImg}
                    alt={blog.title}
                    fill
                    style={{ objectFit: "cover", borderRadius: "inherit" }}
                  />
                </div>
              )}
              <h2 className='text-2xl font-bold'>{blog.title}</h2>
              <div className=''>
                <div
                  className='blog'
                  dangerouslySetInnerHTML={{
                    __html: blog.content.slice(0, 100),
                  }}
                />

                <Link
                  href={`/article/${blog._id}`}
                  className='font-semibold text-red-500'
                >
                  Read More
                </Link>
              </div>
              <div className='flex items-center gap-3 my-4'>
                <p className='text-sm flex items-center gap-2'>
                  <FaHeart className='text-red-700' /> {blog.noOfLikes} like
                  {blog.noOfLikes > 1 && "s"}
                </p>
                <p className='text-sm flex items-center gap-2'>
                  <FaComment /> {blog.noOfComments} comment
                  {blog.noOfComments > 1 && "s"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Feed;
