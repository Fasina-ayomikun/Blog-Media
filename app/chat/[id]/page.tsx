"use client";
import ChatModal from "@/components/ChatModal";
import Navbar from "@/components/Navbar";
import { users } from "@/lib/data";
import { getAllConversations } from "@/lib/features/all-conversations/allConversationSlice";
import { createConversation } from "@/lib/features/conversation/conversationSlice";
import { setOpenChat } from "@/lib/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { UserInterface, parsedUser } from "@/lib/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaImage, FaPhone, FaSearch, FaSmile, FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa6";

const Chat = ({ params }: { params: { id: string } }) => {
  const [convoId, setConvoId] = useState("");
  const [userDetails, setUserDetails] = useState<null | UserInterface>(null);
  const dispatch = useAppDispatch();
  const { openChat } = useAppSelector((store) => store.modalSlice);

  const { conversations } = useAppSelector(
    (state) => state.allConversationSlice
  );
  const handleSidebarUserDetails = (
    firstMember: UserInterface,
    secondMember: UserInterface
  ) => {
    if (firstMember._id === parsedUser?._id) {
      return secondMember;
    } else {
      return firstMember;
    }
  };
  const currentRef = useRef(false);

  useEffect(() => {
    if (!currentRef.current) {
      currentRef.current = true;
    } else {
      if (parsedUser?._id) {
        dispatch(
          createConversation({
            firstMember: parsedUser?._id,
            secondMember: params.id,
          })
        );
      }
    }
    dispatch(getAllConversations(parsedUser?._id as string));
  }, []);
  return (
    <section className=' overflow-y-hidden h-screen '>
      <Navbar />
      <section className='chat md:grid md:grid-cols-4  h-full'>
        <div
          className={`${
            openChat ? "hidden md:block" : "block"
          } bg-gray-400 overflow-auto h-full px-3 py-6 lg:col-span-1 col-span-4 `}
        >
          <form className='flex items-center gap-2 border-[1px] border-black  rounded-md px-3 py-1'>
            <label htmlFor='search'>
              <FaSearch className='text-black' />
            </label>
            <input
              type='text'
              placeholder='Search chats'
              className='outline-none w-full bg-transparent placeholder:text-black'
            />
          </form>
          <div>
            {conversations.map(
              ({
                firstMember,
                secondMember,
                _id,
              }: {
                firstMember: UserInterface;
                secondMember: UserInterface;
                _id: string;
              }) => {
                const user = handleSidebarUserDetails(
                  firstMember,
                  secondMember
                );

                return (
                  <div
                    key={_id}
                    className='flex cursor-pointer items-center gap-3 my-5'
                    onClick={() => {
                      dispatch(setOpenChat());
                      setConvoId(_id);
                      setUserDetails(user);
                    }}
                  >
                    <Image
                      src={user.image}
                      alt={user.fullName}
                      width={40}
                      height={40}
                      className='aspect-square rounded-full object-cover '
                    />
                    <div className=''>
                      <h3 className='font-bold '>{user.fullName}</h3>
                      <p className='text-gray-700 text-sm  lowercase'>
                        {user.bio}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        {/*TODO: Find the correct height*/}
        {openChat ? (
          <ChatModal user={userDetails as UserInterface} convoId={convoId} />
        ) : (
          <h1 className='md:flex hidden items-center justify-center  text-7xl  md:col-span-3  text-gray-300 font-black w-full '>
            Open on a Chat{" "}
          </h1>
        )}
      </section>
    </section>
  );
};

export default Chat;
