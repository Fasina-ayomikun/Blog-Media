import { getAllMessages } from "@/lib/features/all-messages/allMessagesSlice";
import {
  clearMessages,
  createMessages,
} from "@/lib/features/message/messageSlice";
import { setCloseChat } from "@/lib/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { UserInterface, parsedUser } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaImage,
  FaMicrophone,
  FaPaperPlane,
  FaPhone,
  FaSmile,
  FaVideo,
} from "react-icons/fa";
import { MdMoreVert } from "react-icons/md";

const ChatModal = ({
  user,
  convoId,
}: {
  user: UserInterface;
  convoId: string;
}) => {
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { messages } = useAppSelector((state) => state.allMessagesSlice);
  const { openChat } = useAppSelector((state) => state.modalSlice);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    dispatch(getAllMessages(convoId));
    console.log(user);
  }, []);
  return (
    <div
      className={`${
        openChat ? "block " : "md:block hidden"
      }  md:col-span-3 grid grid-rows-10  h-full pb-4 overflow-y-auto`}
    >
      <div className=' w-full h-fit  py-2  border-b-[1px] border-gray-400 row-span-1 '>
        <div className='px-5 flex items-center justify-between gap-4 w-full'>
          <FaArrowLeft
            className='text-gray-800 md:hidden'
            onClick={() => {
              dispatch(setCloseChat());
            }}
          />
          <div className='flex w-full items-center gap-3'>
            {user?.image && (
              <Image
                src={user?.image}
                alt='Fash'
                width={40}
                height={40}
                className='aspect-square rounded-full object-cover '
              />
            )}
            <div className=''>
              <h3 className='font-bold '>{user?.fullName}</h3>
              <p className='text-gray-700 text-sm  lowercase'>
                Active 2 mins ago
              </p>
            </div>
          </div>
          <div className='relative '>
            <MdMoreVert
              className='text-2xl z-40 text-gray-500 cursor-pointer'
              onClick={() => setOpenModal(!openModal)}
            />
            {openModal && (
              <div className='rounded-md px-3 py-2 absolute top-6 bg-white shadow-lg shadow-neutral-300 w-36 -right-4'>
                <p
                  className='text-sm my-1 cursor-pointer'
                  onClick={() => {
                    setOpenModal(false);
                    dispatch(clearMessages(convoId));
                  }}
                >
                  Clear Messages
                </p>
                <p
                  className='text-sm my-1 cursor-pointer'
                  onClick={() => {
                    setOpenModal(false);
                    router.push(`/author/${user?._id}`);
                  }}
                >
                  View Profile
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=' w-full h-full  row-span-8 flex flex-col py-3 overflow-y-auto'>
        <div className=' flex   h-fit flex-col justify-items-end  w-full'>
          {messages.map(
            (message: { _id: string; senderId: string; text: string }) => {
              return (
                <div
                  key={message._id}
                  className={`${
                    message.senderId === parsedUser?._id
                      ? "bg-black text-white self-end  rounded-tr-xl rounded-bl-xl"
                      : "bg-gray-400 text-black rounded-br-xl rounded-tl-xl"
                  } mx-5  px-2 py-1 my-2   w-fit max-w-52 `}
                >
                  {message.text}
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className='row-span-1 px-5 flex items-center '>
        <form className='w-full items-center gap-2 border-[1px] border-gray-400  rounded-md px-3 py-1 flex'>
          <input
            type='text'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder='Search chats'
            className='outline-none w-full bg-transparent placeholder:text-gray-400'
          />
          <FaPaperPlane
            className='text-gray-500'
            onClick={() => {
              dispatch(
                createMessages({
                  conversationId: convoId,
                  senderId: parsedUser?._id as string,
                  text,
                })
              );
              setText("");
            }}
          />
          <FaImage className='text-gray-500' />
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
