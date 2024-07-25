"use client";
import Drafts from "@/components/Drafts";
import PublishModal from "@/components/PublishModal";
import { modules } from "@/lib/data";
import {
  clearState,
  createBlog,
  editBlog,
  getBlog,
  handleChange,
} from "@/lib/features/blog/blogSlice";
import { storage } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import {
  FiAlignRight,
  FiArrowLeftCircle,
  FiArrowRight,
  FiArrowRightCircle,
} from "react-icons/fi";
import { MdOutlineAlignHorizontalRight } from "react-icons/md";
import ReactQuill from "react-quill";
import { v4 } from "uuid";

const Write = () => {
  const { isError, isLoading, title, subtitle, content, bannerImg, published } =
    useAppSelector((state) => state.blogSlice);
  const [value, setValue] = useState(content);
  const [preview, setPreview] = useState(bannerImg || "");
  const [open, setOpen] = useState(false);
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [tagsList, setTagsList] = useState<string[]>([]);
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  const handleFormSubmit = async (
    e: React.FormEvent<HTMLButtonElement>,
    published: boolean
  ) => {
    e.preventDefault();

    try {
      if (published && tagsList.length < 5) {
        alert("Please enter at least 5 tags");
        return;
      }
      let imgUrl = bannerImg || undefined;
      if (file) {
        const imageRef = ref(storage, `blog-media/${file?.name + v4()}`);

        const snapshot = await uploadBytes(imageRef, file);
        imgUrl = await getDownloadURL(snapshot.ref);
      }
      const data = {
        title,
        content: value,
        subtitle,
        bannerImg: imgUrl,
        published,

        tags: tagsList,
      };
      console.log(published);

      dispatch(editBlog({ blogId: id, info: data }));
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
      console.log(result);

      if (result) setPreview(result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  };
  let isPublished = window.localStorage.getItem("BLOG_MEDIA_ARTICLE_PUBLISHED");

  useEffect(() => {
    dispatch(getBlog(id));

    setValue(content);
    setPreview(bannerImg);
    console.log(bannerImg);
  }, []);

  useEffect(() => {
    if (isError) {
      router.replace("/write");
    }
  }, [isError]);
  useEffect(() => {
    isPublished = isPublished ? JSON.parse(isPublished) : null;
    if (isPublished) {
      dispatch(clearState());
      window.localStorage.removeItem("BLOG_MEDIA_ARTICLE_PUBLISHED");
      router.push("/");
    }
  }, [isPublished]);
  return (
    <section className='relative'>
      <nav className=' border-b-[1px] border-gray-300 px-4'>
        <div className='flex items-center container justify-between gap-4 py-4 '>
          <h3 className='text-lg font-bold'>
            <Link href='/'>Blog Media</Link>
          </h3>
          <div className='flex items-center gap-4'>
            {published ? (
              <button
                type='submit'
                disabled={isLoading}
                className='px-3 btn text-sm py-1'
                onClick={() => {
                  setOpenPublishModal(true);
                }}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            ) : (
              <>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-3 btn text-sm py-1'
                  onClick={() => {
                    setOpenPublishModal(true);
                  }}
                >
                  Publish
                </button>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='px-3 bg-gray-300 text-black text-sm py-1 rounded-md'
                  onClick={(e) => {
                    handleFormSubmit(e, false);
                  }}
                >
                  {isLoading ? "Saving..." : "Save Draft"}
                </button>
              </>
            )}
            <FiArrowLeftCircle
              onClick={() => setOpen(true)}
              className='text-3xl text-gray-600'
            />
          </div>
        </div>
      </nav>
      <Drafts open={open} setOpen={setOpen} blogId={id} />
      <PublishModal
        openPublishModal={openPublishModal}
        setOpenPublishModal={setOpenPublishModal}
        handleFormSubmit={handleFormSubmit}
        setTagsList={setTagsList}
      />
      <section className='max-w-5xl mx-auto py-8'>
        <textarea
          name='title'
          value={title}
          onChange={handleEventChange}
          className='text-4xl font-bold w-full h-12'
        >
          Article Title
        </textarea>
        <textarea
          name='subtitle'
          value={subtitle}
          onChange={handleEventChange}
          className='text-sm text-gray-700 w-full '
        >
          Article sub title
        </textarea>
        <div className='relative w-full h-96 my-6'>
          {preview ? (
            <Image src={preview} alt='banner' fill priority objectFit='cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-gray-200'>
              <label
                htmlFor='image'
                className='flex flex-col items-center justify-center gap-5'
              >
                <FaUpload className='text-5xl text-blue-800' />
                <p className='text-center text-sm text-gray-700'>
                  Select a banner image
                </p>

                <label
                  htmlFor='image'
                  className='px-3 text-white rounded-md text-sm py-1 bg-blue-800'
                >
                  Upload File
                </label>
              </label>
              <input
                type='file'
                name='image'
                id='image'
                hidden
                onChange={handleImagePreview}
              />
            </div>
          )}
        </div>
        <ReactQuill
          modules={modules}
          theme='snow'
          value={value}
          onChange={setValue}
        ></ReactQuill>
      </section>
    </section>
  );
};

export default Write;
