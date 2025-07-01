import { prisma } from "@/app/lib/prismaClient";
import Image from "next/image";
import CommentList from "./CommentList";

const Comments = async ({ postId }: { postId: number }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="">
      {/*Write */}
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
