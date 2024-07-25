"use client";
import {
  clearState,
  handleChange,
  signUpUser,
} from "@/lib/features/auth/authSlice";
import { storage } from "@/lib/firebase";
import { RootState, useAppDispatch, useAppSelector } from "@/lib/store";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGoogle, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
const SignUp = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer>("");
  const [file, setFile] = useState<null | File>(null);
  const { isRegistered, isLoading, fullName, email, password, password2, bio } =
    useAppSelector((state: RootState) => state.authSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an image");
      return;
    }
    try {
      const imageRef = ref(storage, `blog-media/${file?.name + v4()}`);

      const snapshot = await uploadBytes(imageRef, file);
      const imgUrl = await getDownloadURL(snapshot.ref);
      const data = {
        fullName,
        email,
        password,
        password2,
        bio,
        image: imgUrl,
      };
      dispatch(signUpUser(data));
      setPreview("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    setFile(file);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      if (result) setPreview(result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };
  useEffect(() => {
    if (isRegistered) {
      router.push("/signin");
      setTimeout(() => {
        dispatch(clearState());
      }, 3000);
    }
  }, [isRegistered]);
  return (
    <section>
      <div className='w-2/5 mx-auto py-3'>
        <h3 className='text-xl font-bold text-center'>Sign Up To Blog Media</h3>
        <p className='text-grey-400 text-sm text-center'>
          Enter your details to sign up for this app
        </p>
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <div className='mx-auto '>
            {preview ? (
              <Image
                src={preview as string}
                alt='images'
                width={120}
                height={120}
                className='rounded-full aspect-square object-cover mx-auto mt-4'
              />
            ) : (
              <label htmlFor='image'>
                <div className='w-28 aspect-square rounded-full bg-gray-300 mx-auto flex items-center justify-center mt-4'>
                  <FaUser className='text-5xl mx-auto text-gray-500' />
                </div>
              </label>
            )}
            <input
              type='file'
              name='image'
              id='image'
              className='hidden'
              onChange={(e) => {
                handleImagePreview(e);
                handleEventChange(e);
              }}
            />
          </div>
          <label
            htmlFor='image'
            className='text-center font-semibold mb-3  flex justify-center mt-2'
          >
            Profile Image
          </label>
          <input
            type='text'
            name='fullName'
            id=''
            value={fullName}
            placeholder='full name'
            onChange={handleEventChange}
            className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3'
          />
          <input
            type='text'
            name='email'
            id=''
            value={email}
            placeholder='email'
            onChange={handleEventChange}
            className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3'
          />
          <textarea
            name='bio'
            id=''
            value={bio}
            onChange={handleEventChange}
            placeholder='bio'
            className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3'
          />
          <input
            type='password'
            name='password'
            id=''
            value={password}
            onChange={handleEventChange}
            placeholder='password'
            className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3'
          />
          <input
            type='password'
            name='password2'
            id=''
            value={password2}
            onChange={handleEventChange}
            placeholder='confirm password'
            className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3'
          />
          <button
            disabled={isLoading}
            type='submit'
            className='bg-black text-white rounded-md w-full py-2 px-3'
          >
            {isLoading ? "Submitting.." : "Sign Up"}
          </button>
        </form>
        <div className='my-5 flex items-center gap-1'>
          <hr className='w-full' />
          <p className='text-sm text-center text-gray-400 w-full'>
            or sign up with
          </p>
          <hr className='w-full' />
        </div>
        <button
          type='submit'
          className='flex items-center gap-4 justify-center bg-gray-200 text-red-600 rounded-md w-full font-semibold py-2 px-3'
        >
          <FaGoogle className='text-red-600' />
          <span className='w-full text-center'>Google</span>
        </button>
        <p className='text-sm text-center my-3'>
          Already have an account?{" "}
          <Link href='/signin' className='font-bold'>
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
