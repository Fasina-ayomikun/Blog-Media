import { UserInterface } from "@/lib/types";
import Image from "next/image";
import React from "react";

const SingleBlogger = ({ user }: { user: UserInterface }) => {
  return (
    <div className='flex items-center gap-3 my-5'>
      <Image
        src={user.image}
        alt={user.fullName}
        width={40}
        height={40}
        className='aspect-square rounded-full object-cover '
      />
      <div className=''>
        <h3 className='font-bold '>{user.fullName}</h3>
        <p className='text-gray-400 text-sm  lowercase'>@{user.fullName}</p>
      </div>
    </div>
  );
};

export default SingleBlogger;
