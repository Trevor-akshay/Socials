import { prisma } from "@/app/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";

const FriendRequest = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: userId,
    },
    include: {
      sender: true,
    },
  });

  if (requests.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 p-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-red-500 text-xs">
          See all
        </Link>
      </div>
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequest;
