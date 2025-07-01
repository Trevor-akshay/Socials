import { auth } from "@clerk/nextjs/server";
import Post from "./Post";
import { prisma } from "@/app/lib/prismaClient";
import { tr } from "zod/v4/locales";

const Feed = async ({ username }: { username?: string }) => {
  const { userId } = await auth();

  let posts: any[] = [];
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIDs = following.map((f) => f.followingId);
    followingIDs.push(userId);
    posts = await prisma.post.findMany({
      where: {
        userId: {
          in: followingIDs,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-20">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} userId={userId} />)
      ) : (
        <div>No Posts founds</div>
      )}
    </div>
  );
};

export default Feed;
