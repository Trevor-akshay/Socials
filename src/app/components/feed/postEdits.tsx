"use client";

import { deletePost } from "@/app/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostEdits = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const deletePostWithId = deletePost.bind(null, postId);

  return (
    <div className="relative">
      <Image
        src="/more.png"
        alt="more"
        width={16}
        height={16}
        onClick={() => setOpen((prev) => !prev)}
		className="cursor-pointer"
      />

      {open && (
        <div className="absolute w-32 top-4 right-0 bg-white p-4 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-50">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={deletePostWithId}>
            <button className="text-red-500">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostEdits;
