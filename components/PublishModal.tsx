import { handleChange } from "@/lib/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import React from "react";

const PublishModal = ({
  openPublishModal,
  setOpenPublishModal,
  handleFormSubmit,
  setTagsList,
}: {
  openPublishModal: boolean;
  handleFormSubmit: (
    e: React.FormEvent<HTMLButtonElement>,
    published: boolean
  ) => void;

  setOpenPublishModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTagsList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { isLoading, tags, published } = useAppSelector(
    (state) => state.blogSlice
  );
  const dispatch = useAppDispatch();
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(",");
    const newValues = value.filter((value) => {
      return value.trim() !== "";
    });
    setTagsList(newValues);
  };
  return (
    <div
      className={` fixed top-0 right-0  bottom-0   left-0 bg-black bg-opacity-45 z-30  grid place-content-center ${
        openPublishModal ? "grid" : "hidden"
      }`}
    >
      <form className=' p-5 rounded-md bg-white flex flex-col items-center gap-3 '>
        <label htmlFor='tags' className='  text-md font-semibold text-center '>
          Describe your article in at least 5 words
          <span className='block text-xs text-gray-500 font-normal mt-1'>
            Place a comma after each word e.g fun,code,java
          </span>
        </label>
        <input
          className='border-[1px] my-2  text-sm outline-none border-gray-400 px-2 py-1 rounded-md w-full '
          type='text'
          onChange={handleTagChange}
          name='tags'
          placeholder='code,fun,java'
        />
        {tags?.length >= 1 && (
          <span className=' text-xs text-gray-700 font-normal text-start'>
            Previous Tags: {tags.join(",")}
          </span>
        )}
        <div className='self-end flex gap-2'>
          <button
            type='submit'
            className='px-3 border-[1px] border-black rounded-md font-semibold text-sm py-1 '
            onClick={(e) => {
              setOpenPublishModal(false);
            }}
          >
            Cancel
          </button>

          <button
            type='submit'
            className='px-3 btn text-sm border-[1px] border-black py-1 self-end'
            onClick={(e) => {
              handleFormSubmit(e, true);
            }}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishModal;
