import { getAllDrafts } from "@/lib/features/all-blogs/allBlogsSlice";
import { deleteBlog } from "@/lib/features/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { BlogInterface, UserInterface } from "@/lib/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";

const Drafts = ({
  open,
  setOpen,
  blogId,
}: {
  open: boolean;
  blogId?: string | string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [confirmDelete, setConfirmDelete] = useState({ id: "", delete: false });

  const { drafts } = useAppSelector((state) => state.allBlogsSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage !== undefined) {
      let token = localStorage.getItem("BLOG-MEDIA-TOKEN");
      let parsedToken: string = token && JSON.parse(token);
      console.log(parsedToken);
    }
    dispatch(getAllDrafts({}));
  }, []);
  return (
    <section
      className={`flex fixed top-0 right-0  bottom-0   left-0 bg-black bg-opacity-45 z-20  items-center justify-end ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className='py-3 h-full w-1/3  bg-white overflow-auto'>
        <div className='flex gap-5   px-6 '>
          <FiArrowRightCircle
            onClick={() => setOpen(false)}
            className='text-3xl text-gray-700'
          />
          <h2 className='text-2xl font-bold text-center mb-2  text-gray-700'>
            Drafts
          </h2>
        </div>
        <hr />
        <div>
          {drafts.length < 1 ? (
            <p className='text-sm text-gray-800 my-4   px-6 '>
              No drafts saved
            </p>
          ) : (
            drafts.map((draft: BlogInterface) => {
              return (
                <div
                  key={draft._id}
                  className={`${
                    blogId === draft._id ? "bg-gray-200" : "bg-transparent"
                  } px-6 `}
                >
                  <div className='w-full py-3 flex gap-5 items-center '>
                    <div
                      className='w-full cursor-pointer'
                      onClick={() => router.push(`/write/${draft._id}`)}
                    >
                      <h3 className='font-bold '>{draft?.title}</h3>
                      <p className='text-gray-700 text-sm  lowercase'>
                        {draft.subtitle}
                      </p>
                    </div>
                    <FaTrash
                      className='text-red-400 '
                      onClick={() =>
                        setConfirmDelete({ id: draft._id, delete: true })
                      }
                    />
                  </div>

                  {confirmDelete.id === draft._id && confirmDelete.delete && (
                    <p className='text-sm font-semibold cursor-pointer '>
                      Do you want to delete this draft?{" "}
                      <span
                        className='mx-3 text-red-500'
                        onClick={() => {
                          dispatch(deleteBlog(draft._id));

                          setConfirmDelete({ id: "", delete: false });
                        }}
                      >
                        Yes
                      </span>
                      <span
                        className='text-blue-500'
                        onClick={() =>
                          setConfirmDelete({ id: "", delete: false })
                        }
                      >
                        No
                      </span>
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Drafts;
