import { getAllComments } from "@/lib/features/all-comments/allCommentsSlice";
import {
  clearState,
  createComment,
  deleteComment,
  editComment,
  handleChange,
} from "@/lib/features/comment/commentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { CommentDetailsInterface } from "@/lib/types";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaComment,
  FaHeart,
  FaRegTimesCircle,
  FaSearch,
  FaTimesCircle,
  FaTrash,
} from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { MdMoreHoriz, MdMoreVert } from "react-icons/md";

const Comments = ({
  open,
  setOpen,
  blogId,
}: {
  open: boolean;
  blogId: string | string[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openModal, setOpenModal] = useState<{
    id: string | undefined;
    open: boolean;
  }>({ id: "", open: false });
  const [isEditing, setIsEditing] = useState({ id: "", editing: false });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading: commentsLoading, comments } = useAppSelector(
    (state) => state.allCommentsSlice
  );

  const {
    isLoading: commentLoading,
    text,
    editingText,
  } = useAppSelector((state) => state.commentSlice);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { text };
    dispatch(createComment({ blogId, data }));
  };
  useEffect(() => {
    dispatch(getAllComments(blogId));
  }, []);
  return (
    <section
      className={`flex fixed top-0 right-0  bottom-0   left-0 bg-black bg-opacity-45 z-20  items-center justify-end ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className='py-3 h-full w-1/3  bg-white overflow-auto'>
        <div className='flex gap-5   px-6 '>
          <FaRegTimesCircle
            onClick={() => setOpen(false)}
            className='text-3xl text-gray-700'
          />
          <h2 className='text-2xl font-bold text-center mb-2  text-gray-700'>
            Comments
          </h2>
        </div>
        <hr />{" "}
        <form
          onSubmit={handleFormSubmit}
          className='mx-6 my-5 flex items-center gap-2 border-[1px] border-gray-800  rounded-md px-3 py-1'
        >
          <input
            type='text'
            placeholder='Write a short comment'
            name='text'
            value={text}
            onChange={(e) =>
              dispatch(
                handleChange({ name: e.target.name, value: e.target.value })
              )
            }
            className='outline-none w-full bg-transparent placeholder:text-black'
          />
          <button
            disabled={commentLoading}
            type='submit'
            className='btn px-4 text-sm py-1'
          >
            {commentLoading ? "Sending.." : "Send"}
          </button>
        </form>
        <hr />
        {commentsLoading ? (
          <p className='px-6 py-2 text-md'>Loading...</p>
        ) : (
          <div>
            {comments.length < 1 ? (
              <p className='text-sm text-gray-800 my-4   px-6 '>
                Be the first to comment
              </p>
            ) : (
              comments.map((comment: CommentDetailsInterface) => {
                return (
                  <div
                    key={comment._id}
                    className='comment flex items-start gap-4 py-2 border-b-[1px] px-6'
                  >
                    <div className=' w-full'>
                      <div className='flex items-center justify-between gap-4 '>
                        <div className='flex items-center gap-4 my-5'>
                          {comment.user && (
                            <Image
                              src={comment?.user?.image}
                              alt={comment?.user.fullName}
                              width={40}
                              height={40}
                              className='aspect-square rounded-full object-cover '
                            />
                          )}
                          <div className=''>
                            <h3 className='font-normal text-sm '>
                              {comment.user?.fullName}{" "}
                              {comment.createdAt &&
                                comment.updatedAt &&
                                comment?.createdAt < comment?.updatedAt && (
                                  <span className='text-xs text-gray-700 ml-2'>
                                    edited
                                  </span>
                                )}
                            </h3>
                            <p className='text-gray-400 text-xs  lowercase'>
                              {moment(comment.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                        <div className='relative '>
                          <MdMoreHoriz
                            className='text-2xl text-gray-500 cursor-pointer'
                            onClick={() =>
                              setOpenModal({
                                id: comment._id,
                                open: !openModal.open,
                              })
                            }
                          />
                          {openModal.id === comment._id && openModal.open && (
                            <div className='rounded-md px-3 py-2 absolute top-6 bg-white shadow-lg shadow-neutral-300 w-36 -right-4'>
                              <p
                                className='text-sm my-1 cursor-pointer'
                                onClick={() => {
                                  setOpenModal({
                                    id: "",
                                    open: false,
                                  });
                                  setIsEditing({
                                    id: comment?._id as string,
                                    editing: true,
                                  });
                                  dispatch(
                                    handleChange({
                                      name: "editingText",
                                      value: comment.text,
                                    })
                                  );
                                }}
                              >
                                Edit Message
                              </p>
                              <p
                                className='text-sm my-1 cursor-pointer'
                                onClick={() => {
                                  setOpenModal({
                                    id: "",
                                    open: false,
                                  });
                                  dispatch(
                                    deleteComment({
                                      commentId: comment?._id,
                                      blogId,
                                    })
                                  );
                                }}
                              >
                                {" "}
                                Delete Message
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='flex flex-col justify-end items-end gap-2'>
                        <textarea
                          readOnly={!isEditing}
                          value={
                            isEditing.editing && isEditing.id === comment._id
                              ? editingText
                              : comment.text
                          }
                          name='editingText'
                          onChange={(e) =>
                            dispatch(
                              handleChange({
                                name: e.target.name,
                                value: e.target.value,
                              })
                            )
                          }
                          className={`${
                            isEditing.id === comment._id && isEditing.editing
                              ? " bg-gray-100 shadow-md  shadow-neutral-500"
                              : ""
                          }text-sm my-1 px-3 py-1 font-normal w-full`}
                        ></textarea>
                        {isEditing.id === comment._id && isEditing.editing && (
                          <button
                            type='submit'
                            onClick={() => {
                              dispatch(
                                editComment({
                                  commentId: comment?._id as string,
                                  info: { text: editingText },
                                  blogId,
                                })
                              );
                              setIsEditing({ id: "", editing: false });
                            }}
                            className='btn px-4 py-1 font-normal text-sm w-fit'
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Comments;
