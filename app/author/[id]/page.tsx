"use client";
import AuthorDetails from "@/components/AuthorDetails";
import Navbar from "@/components/Navbar";
import {
  getAllFollowers,
  toggleFollow,
} from "@/lib/features/follow/followSlice";
import { getUserDetails } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { BlogInterface, UserInterface, parsedUser } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Author = ({ params }: { params: { id: string } }) => {
  const [authorArticles, setAuthorArticles] = useState<null | BlogInterface[]>(
    null
  );
  const [openPosts, setOpenPosts] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { followers } = useAppSelector((state) => state.followSlice);
  const { author } = useAppSelector((state) => state.userSlice);

  const fetchAuthorArticles = async () => {
    try {
      const resp = await axios.get(`/api/blog/username/${author?._id}`);
      console.log(resp.data);
      if (resp.status === 200) {
        setAuthorArticles(resp.data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getUserDetails({ id: params.id }));
    if (window.localStorage !== undefined) {
      let token = localStorage.getItem("BLOG-MEDIA-TOKEN");
      let parsedToken: string = token && JSON.parse(token);
      console.log(parsedToken);
    }
  }, []);
  useEffect(() => {
    if (author?._id) {
      fetchAuthorArticles();

      dispatch(getAllFollowers({ userId: author?._id as string }));
    }
  }, [author]);
  return (
    <section>
      <Navbar />
      <section className='container'>
        <AuthorDetails text='' />
        <div className=' tabs flex items-center gap-3 my-4 container   w-11/12 '>
          <p
            onClick={() => setOpenPosts(true)}
            className={`${
              openPosts && "tab"
            } cursor-pointer font-semibold  pb-3 px-3`}
          >
            Posts
          </p>
          <p
            onClick={() => {
              setOpenPosts(false);
            }}
            className={`${
              !openPosts && "tab"
            } cursor-pointer font-semibold  pb-3 px-3`}
          >
            Followers
          </p>
        </div>
        {openPosts ? (
          <div className='max-w-5xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8'>
            {authorArticles?.map((article) => {
              return (
                <div className='w-full' key={article._id}>
                  {article?.bannerImg && (
                    <Image
                      src={article?.bannerImg}
                      alt={article?.title}
                      width={400}
                      height={400}
                      onClick={() => {
                        router.push(`/article/${article._id}`);
                      }}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <h4 className='text-md font-semibold mt-3'>
                    {article?.title}
                  </h4>
                  <p className='text-sm text-gray-500 lowercase'>
                    {article?.noOfComments} comment
                    {article?.noOfComments > 1 && "s"}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='max-w-5xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8'>
            {followers?.map(
              (follower: {
                _id: string;
                follower: string;
                following: UserInterface;
              }) => {
                console.log(follower);

                return (
                  <div className='w-full' key={follower._id}>
                    {follower.following?.image && (
                      <Image
                        src={follower.following?.image}
                        alt={follower.following?.fullName}
                        width={400}
                        height={400}
                        onClick={() => {
                          router.push(`/author/${follower.following._id}`);
                        }}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <h4 className='text-md font-semibold mt-3'>
                      {follower.following?.fullName}
                    </h4>
                    <p className='text-sm text-gray-500 lowercase'>
                      {follower.following.email}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
    </section>
  );
};

export default Author;
