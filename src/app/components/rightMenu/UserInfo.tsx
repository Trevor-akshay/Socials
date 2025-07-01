import { User } from "@/generated/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../lib/prismaClient";
import UserInfoInteraction from "./UserInfoInteraction";
import UpdateUser from "./UpdateUser";

const UserInfo = async ({ user }: { user: User }) => {
  const createdAtDate = new Date(user.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { userId: currentUser } = await auth();

  if (!currentUser) return null;

  const blockRes = await prisma.block.findFirst({
    where: {
      blockerId: currentUser,
      blockedId: user.id,
    },
  });

  isUserBlocked = blockRes ? true : false;

  const followRes = await prisma.follower.findFirst({
    where: {
      followerId: currentUser,
      followingId: user.id,
    },
  });

  isFollowing = followRes ? true : false;

  const followingRes = await prisma.followRequest.findFirst({
    where: {
      senderId: currentUser,
      receiverId: user.id,
    },
  });

  isFollowingSent = followingRes ? true : false;

  return (
    <div className="bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 p-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Details</span>
        {user.id === currentUser ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="/" className="text-red-500 text-xs">
            See all
          </Link>
        )}
      </div>
      {/*Bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm text-red-400">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
        {user.city && (
          <div className="flex items-center gap-2">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span>{user.city}</span>
          </div>
        )}
        {user.school && (
          <div className="flex items-center gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span>{user.school} </span>
          </div>
        )}
        {user.work && (
          <div className="flex items-center gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span>{user.work}</span>
          </div>
        )}
        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/work.png" alt="" width={16} height={16} />
              <Link href="/" className="text-blue-500 font-medium">
                {user.website}
              </Link>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Image src="/date.png" alt="" width={16} height={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
        {user.id !== currentUser && (
          <UserInfoInteraction
            userId={user.id}
            currentUserId={currentUser}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfo;
