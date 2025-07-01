"use client";

import { addComment } from "@/app/lib/actions";
import { Comment, User } from "@/generated/prisma";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Fragment, useOptimistic, useState } from "react";
import { set } from "zod/v4";

type CommentWithUserType = Comment & {
  user: User;
};
const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUserType[];
  postId: any;
}) => {
  const { user } = useUser();

  const [commentState, setCommentState] = useState(comments);
  const [description, setDescription] = useState("");

  const add = async () => {
    if (!user || !description) return;

    addOptimisticComment({
      id: Math.random(),
      desc: description,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending the comment",
        avatar: user.imageUrl || "/noAvatar.png",
        name: "",
        surname: "",
        cover: "",
        city: "",
        description: "",
        work: "",
        school: "",
        website: "",
        email: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, description);
      setCommentState((prev) => [...prev, createdComment]);
    } catch (error) {}
  };
  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, command: CommentWithUserType) => [command, ...state]
  );
  return (
    <Fragment>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt="avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            className="flex-1 flex items-center justify-center bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
            action={add}
          >
            <input
              type="text"
              placeholder="Write your comment"
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Image
              src="/emoji.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
          </form>
        </div>
      )}
      {/*Comments */}
      <div className="p-8">
        {/*Comment */}
        {optimisticComment.map((comment) => (
          <div className="flex gap-2 justify-between mb-4" key={comment.id}>
            {/*Avatar */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            {/*Desc */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p className="text-sm">{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-1">
                <div className="flex items-center gap-4">
                  <Image 
                    src="/like.png"
                    alt=""
                    width={16}
                    height={16}
                    className="cursor-pointer w-4 h-4"
                  ></Image>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-300"> 0 Likes</span>
                </div>
                <div className="">Reply</div>
              </div>
            </div>
            {/*Icon */}
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            ></Image>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default CommentList;
