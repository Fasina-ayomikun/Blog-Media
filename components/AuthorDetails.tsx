import {
  getAllFollowers,
  toggleFollow,
} from "@/lib/features/follow/followSlice";
import { getUserDetails } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { UserInterface, parsedUser } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const AuthorDetails = ({ text }: { text: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { followers } = useAppSelector((state) => state.followSlice);
  const { authorFollowers, author } = useAppSelector(
    (state) => state.userSlice
  );

  console.log(followers);
  useEffect(() => {
    console.log(followers);
    if (author?._id) {
      dispatch(getAllFollowers({ userId: author?._id as string }));
    }
  }, [author?._id]);

  return (
    <div className='w-4/6 md:w-1/2 mx-auto my-14'>
      {author?.image && (
        <Image
          src={author?.image}
          alt={author?.fullName}
          width={150}
          height={150}
          style={{
            aspectRatio: "1",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}
      <div className=' flex md:flex-nowrap flex-wrap items-center justify-between gap-3 my-4'>
        <div>
          <h3 className='text-xl font-bold'>
            {text} {author?.fullName}
          </h3>
          <p className='text-sm text-gray-600 '>{author?.email}</p>
          <p className='text-sm text-gray-600 '>
            {followers.length} follower{followers.length > 1 && "s"}
          </p>
        </div>
        {author?._id !== parsedUser?._id && (
          <div className='flex gap-4 items-center'>
            {/* FIXME: parsed user must follow before messaging */}
            <FaPaperPlane
              className='text-gray-600'
              onClick={() => {
                router.push(`/chat/${author._id}`);
              }}
            />
            <button
              onClick={() => {
                dispatch(
                  toggleFollow({
                    follower: author?._id as string,
                    following: parsedUser?._id as string,
                  })
                );
              }}
              type='button'
              className='px-3 btn text-sm py-1'
            >
              {authorFollowers.includes(parsedUser?._id as string)
                ? "Following"
                : "Follow"}
            </button>
          </div>
        )}
      </div>
      <p className='text-sm'>{author?.bio}</p>
    </div>
  );
};

export default AuthorDetails;
