import { prisma } from "@/app/lib/prismaClient";
import { User } from "@/generated/prisma";
import Image from "next/image";
import Link from "next/link";

const UserMedia = async ({ user }: { user: User }) => {
  const postsWithMedia = await prisma.post.findMany({
    where: {
      userId: user.id,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 p-4">
      {/* Top */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-red-500 text-xs">
          See all
        </Link>
      </div>
      {/*Bootom */}
      <div className="flex gap-4 justify-between flex-wrap">
        {postsWithMedia.length
          ? postsWithMedia.map((post, index) => (
              <div className="relative w-1/5 h-24" key={post.id}>
                <Image
                  src={post.img!}
                  alt={`post - ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))
          : "No Posts"}
      </div>
    </div>
  );
};

export default UserMedia;
