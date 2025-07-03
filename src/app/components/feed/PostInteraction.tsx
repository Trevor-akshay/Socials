"use client";
import Image from "next/image";
import Comments from "./Comments";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useOptimistic, useState } from "react";
import { switchLike } from "@/app/lib/actions";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: number;
  likes: string[];
  commentNumber: number;
}) => {
  const { isLoaded, userId } = useAuth();
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: userId && likes.includes(userId),
  });

  useEffect(() => {
    if (isLoaded && userId) {
      setLikeState({
        likeCount: likes.length,
        isLiked: likes.includes(userId),
      });
    }
  }, [isLoaded, userId, likes]);

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    if(!userId) return;
    switchOptimisticLike("");
    try {
      switchLike(postId);
      setLikeState((prev) => ({
        likeCount: optimisticLike.isLiked
          ? optimisticLike.likeCount - 1
          : optimisticLike.likeCount + 1,
        isLiked: !optimisticLike.isLiked,
      }));
    } catch (error) {
      console.log("Like action error", error);
    }
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt=""
                width={16}
                height={16}
                className="cursor-pointer"
              />
            </button>
          </form>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {optimisticLike.likeCount}
            <span className="hidden md:inline"> likes</span>
          </span>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/comment.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber}
            <span className="hidden md:inline"> comments</span>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/share.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> shares</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
