import Image from "next/image";
import { prisma } from "../lib/prismaClient";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

const Stories = async () => {
  const { userId: currentUserId } = await auth();

  let stories;
  if (currentUserId) {
    stories = await prisma.story.findMany({
      where: {
        expiresAt: {
          gt: new Date(),
        },
        OR: [
          {
            user: {
              followers: {
                some: {
                  followerId: currentUserId,
                },
              },
            },
          },
          {
            userId: currentUserId,
          },
        ],
      },
      include: {
        user: true,
      },
    });
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        {currentUserId ? (
          <StoryList stories={stories!} userId={currentUserId} />
        ) : (
          <div className="flex flex-wrap gap-5 items-center">
            <Image
              src={"/noAvatar.png"}
              alt="avatar"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 ring-red-300"
            />
            <span className="font-semibold">Please Login to Post Stories</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
