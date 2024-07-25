"use client";
import {
  clearState,
  handleChange,
  signInUser,
} from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isRegistered, isLoading, email, password } = useAppSelector(
    (state) => state.authSlice
  );
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

    dispatch(signInUser({ email, password }));
  };
  useEffect(() => {
    if (isRegistered) {
      router.push("/");
      setTimeout(() => {
        dispatch(clearState());
      }, 3000);
    }
  }, [isRegistered]);
  return (
    <section className=' h-screen flex justify-center items-center'>
      <div className='w-2/6 mx-auto py-3'>
        <h3 className='text-xl font-bold text-center'>Sign In To Blog Media</h3>
        <p className='text-grey-400 text-sm text-center mb-5'>
          Enter your details to sign in
        </p>
        <form onSubmit={handleFormSubmit}>
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            placeholder='email'
            onChange={handleEventChange}
            className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3'
          />
          <div className='px-2 py-1 rounded-md border-[1px] border-gray-400 w-full mb-3 flex items-center gap-2'>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              id='password'
              value={password}
              onChange={handleEventChange}
              placeholder='password'
              className='w-full'
            />
            {showPassword ? (
              <FaEyeSlash onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye onClick={() => setShowPassword(true)} />
            )}
          </div>
          <button
            disabled={isLoading}
            type='submit'
            className='bg-black text-white rounded-md w-full py-2 px-3'
          >
            {isLoading ? "Submitting.." : "Sign In"}
          </button>
        </form>
        <div className='my-5 flex items-center gap-1'>
          <hr className='w-full' />
          <p className='text-sm text-center text-gray-400 w-full'>
            or sign in with
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
          Don't have an account?{" "}
          <Link href='/signup' className='font-bold'>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
