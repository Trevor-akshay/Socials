import Image from "next/image";
import { prisma } from "../../lib/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { use } from "react";
import Link from "next/link";

const ProfileCard = async () => {
  const { userId } = await auth();

  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  if (!user) return null;
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={user?.cover || "/noCover.png"}
          alt="cover"
          fill
          className="rounded-md object-cover "
        />
        <Image
          src={user?.avatar || "/noAvatar.png"}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>
      <div className="h-20 flex flex-col gap-2 items-center">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/8959074/pexels-photo-8959074.jpeg"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/8959074/pexels-photo-8959074.jpeg"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/8959074/pexels-photo-8959074.jpeg"
              alt=""
              width={12}
              height={12}
              className="rounded-full w-3 h-3"
            />
          </div>
          <span className="text-xs text-gray-500">
            {user?._count.followers} Followers
          </span>
        </div>
        <Link
          href={`/profile/${user.username}`}
          className="text-blue-500 font-medium text-xs"
        >
          <button className="bg-red-500 text-white text-xs p-2 rounded-md cursor-pointer">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
