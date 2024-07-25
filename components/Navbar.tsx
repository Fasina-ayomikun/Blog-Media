"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { parsedUser } from "@/lib/types";
import { FaMessage } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className='border-b-[1px] border-gray-300 px-4 max-h-20  h-full flex items-center'>
      <div className='container py-5 flex items-center justify-between gap-5'>
        <h3 className='text-lg font-bold'>
          <Link href='/'>Blog Media</Link>
        </h3>
        <form className='hidden md:flex items-center gap-2 border-[1px] border-gray-400 rounded-md px-3 py-1'>
          <label htmlFor='search'>
            <FaSearch className='text-gray-400' />
          </label>
          <input
            type='text'
            placeholder='Search..'
            className='outline-none w-full'
          />
        </form>
        <div className='flex items-center gap-6'>
          <button type='button' className='px-3 btn text-sm py-1'>
            <Link href='/write'>Write</Link>
          </button>
          <FaMessage
            onClick={() => {
              router.push("/chat");
            }}
          />
          {parsedUser ? (
            <div className='flex items-center gap-2'>
              {parsedUser?.image && (
                <div className='relative w-10 h-10 aspect-square '>
                  <Image
                    src={parsedUser?.image}
                    alt='profile image'
                    fill
                    className='rounded-full object-fit'
                  />
                </div>
              )}
              <FaChevronDown className='text-gray-500' />
            </div>
          ) : (
            <button
              type='button'
              className='px-3 bg-gray-300 text-black text-sm py-1 rounded-md'
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
