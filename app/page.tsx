"use client";
import Feed from "@/components/Feed";
import Navbar from "@/components/Navbar";
import { users } from "@/lib/data";
import { RootState } from "@/lib/store";
import SingleBlogger from "@/mini-components/SIngleBlogger";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  // const { value } = useSelector((state: RootState) => state.authSlice);
  const dispatch = useDispatch();
  return (
    <section>
      <Navbar />
      <section className='px-3 py-6 lg:grid container lg:grid-cols-4 gap-8'>
        <Feed />
        <div className='hidden lg:block border-[1px] px-6 rounded-md border-grey-100 w-full h-fit'>
          {users.map((user) => {
            return <SingleBlogger key={user._id} user={user} />;
          })}
        </div>
      </section>
    </section>
  );
}
