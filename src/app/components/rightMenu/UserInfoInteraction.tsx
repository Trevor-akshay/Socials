"use client";

import { switchBlock, switchFollow } from "@/app/lib/actions";
import { useOptimistic, useState } from "react";

const UserInfoInteraction = ({
  userId,
  currentUserId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  currentUserId: string;
  isUserBlocked: boolean;
  isFollowing: boolean;
  isFollowingSent: boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    followingRequestSent: isFollowingSent,
    userBlocked: isUserBlocked,
  });


  const follow = async () => {
    setOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((prev) => ({
        ...prev,
        following: userState.following && false,
        followingRequestSent:
          !userState.following && !userState.followingRequestSent
            ? true
            : false,
      }));
    } catch (error) {
      console.log("UserInfoInteraction follow err ", error);
    }
  };

  const block = async () => {
    setOptimisticState("block");
    try {
      await switchBlock(userId);
      setUserState((prev) => ({
        following: false,
        followingRequestSent: false,
        userBlocked: !prev.userBlocked,
      }));
    } catch (error) {
      console.log("UserInfoInteraction block err ", error);
    }
  };

  const [optimisticState, setOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, userBlocked: !state.userBlocked }
  );
  return (
    <>
      <form action={follow}>
        <button
          disabled={optimisticState.userBlocked}
          className={`w-full text-white text-sm rounded-md p-2 ${
            optimisticState.userBlocked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          }`}
        >
          {!optimisticState.userBlocked && optimisticState.following
            ? "Unfollow"
            : !optimisticState.userBlocked &&
              optimisticState.followingRequestSent
            ? "Follow Request Sent"
            : "Follow"}
        </button>
      </form>
      <form action={block} className="self-end">
        <button className="text-red-700 text-xs cursor-pointer">
          {optimisticState.userBlocked ? "Unblock" : "Block"}
        </button>
      </form>
    </>
  );
};

export default UserInfoInteraction;
