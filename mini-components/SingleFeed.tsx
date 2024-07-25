import { PostInterface } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { FaComment, FaHeart } from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

const SingleFeed = ({ post }: { post: PostInterface }) => {
  return (
    <div className='flex items-start gap-4 mt-5'>
      <Image
        src={post.user.profileImage}
        alt={post.user.name}
        width={40}
        height={40}
        className='aspect-square rounded-full object-cover'
      ></Image>
      <div className='mt-2 w-full border-b-[1px] border-gray-400 pb-5'>
        <div className='flex items-center justify-between gap-4 my-4'>
          <p className='flex flex-col items-start text-md font-semibold '>
            {post.user.name}{" "}
            <span className='font-light text-gray-400 text-sm'>3 mins ago</span>
          </p>
          <MdMoreVert className='text-2xl' />
        </div>
        <div className='relative rounded-sm mb-5 w-full h-96 '>
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
        <h2 className='text-2xl font-bold'>{post.title}</h2>
        <p className='text-sm text-gray-700'>
          {post.desc}{" "}
          <Link href={`/posts/${10}`} className='font-semibold text-red-500'>
            Read More
          </Link>
        </p>
        <div className='flex items-center gap-3 my-4'>
          <p className='text-sm flex items-center gap-2'>
            <FaHeart className='text-red-700' /> {post.noOfLikes} like
            {post.noOfLikes > 1 && "s"}
          </p>
          <p className='text-sm flex items-center gap-2'>
            <FaComment /> {post.noOfComments} comment
            {post.noOfComments > 1 && "s"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SingleFeed;
