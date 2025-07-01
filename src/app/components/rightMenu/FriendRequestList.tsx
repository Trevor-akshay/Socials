"use client";

import { accepteFollowRequest, rejectFollowRequest } from "@/app/lib/actions";
import { FollowRequest, User } from "@/generated/prisma";
import Image from "next/image";
import React from "react";
import { useOptimistic, useState } from "react";

type RequestWithSender = FollowRequest & {
  sender: User;
};
const FriendRequestList = ({ requests }: { requests: RequestWithSender[] }) => {
  const [requestState, setRequestState] = useState(requests);

  const accept = async (requestId: number, userId: string) => {
    removeOptimisticeRequest(requestId);

    try {
      await accepteFollowRequest(userId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.log("Friend request accept error", error);
    }
  };

  const remove = async (requestId: number, userId: string) => {
    removeOptimisticeRequest(requestId);

    try { 
      await rejectFollowRequest(userId);
      setRequestState((prev) =>
        prev.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.log("Friend request remove error", error);
    }
  };

  const [optimisticRequests, removeOptimisticeRequest] = useOptimistic(
    requestState,
    (state, value: number) => state.filter((request) => request.id !== value)
  );

  return (
    <div className="flex items-center justify-between">
      {optimisticRequests.map((request) => (
        <React.Fragment key={request.id}>
          <div className="flex items-center  gap-4">
            <Image
              src={request.sender.avatar || "/noAvatar.png"}
              alt="avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-semibold">
              {request.sender.name ?? request.sender.username}
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
            <form action={() => remove(request.id, request.sender.id)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FriendRequestList;
