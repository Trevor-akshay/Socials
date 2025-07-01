import Image from "next/image";
import { Post as PostType, User } from "@/generated/prisma";
import PostInteraction from "./PostInteraction";
import Comments from "./Comments";
import { Suspense } from "react";
import PostEdits from "./postEdits";
import { useAuth } from "@clerk/nextjs";

type FeedPostType = PostType & {
  user: User;
  likes: [{ userId: string }];
} & {
  _count: { comments: number };
};

const Post = ({
  post,
  userId,
}: {
  post: FeedPostType;
  userId: string | null;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* User*/}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt="avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        {userId === post.user.id && <PostEdits postId={post.id} />}
      </div>
      {/* Desc*/}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt="post"
              fill
              className="object-contain rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>
      {/* Inter*/}
      <Suspense fallback="loading...">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.comments}
        />
      </Suspense>

      <Suspense fallback="loading...">
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
