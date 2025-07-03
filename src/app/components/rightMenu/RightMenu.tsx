import { User } from "@/generated/prisma";
import Ad from "./Ad";
import Birthdays from "./Birthdays";
import FriendRequest from "./FriendRequest";
import UserInfo from "./UserInfo";
import UserMedia from "./UserMedia";
import { Suspense } from "react";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="loading..">
            <UserInfo user={user} />
          </Suspense>
          <Suspense fallback="loading..">
            <UserMedia user={user} />
          </Suspense>
          <Birthdays />
        </>
      ) : null}
      <FriendRequest />
      <Ad />
    </div>
  );
};

export default RightMenu;
