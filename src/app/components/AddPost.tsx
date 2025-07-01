"use client";

import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { Fragment, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./addPostButton";
import { addPost } from "../lib/actions";

const AddPost = () => {
  const { isLoaded, user } = useUser();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<any>();

  if (!isLoaded) return <div>Loading</div>;
  return (
    <Fragment>
      {user && (
        <div className="p-4 bg-white rounded-lg flex gap-4 justify-between text-sm">
          <Image
            src={user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-full"
          ></Image>
          <div className="flex-1">
            <form
              action={(formData) => {
                addPost(formData, image?.secure_url || "");
              }}
              className="flex gap-4"
            >
              <textarea
                placeholder="Whatever you feel like sharing"
                id="desc"
                className="flex-1 bg-slate-100 rounded-lg p-2"
                name="desc"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <AddPostButton />
            </form>
            <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result, { widget }) => {
                  const info = result.info!;
                  if (typeof info !== "string") {
                    setImage(info);
                  } else {
                    console.error("Unexpected upload result.info:", info);
                  }
                  widget.close();
                }}
                onError={(error) => {
                  console.error("Upload error:", error);
                }}
              >
                {({ open }) => {
                  return (
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => open?.()}
                    >
                      <Image
                        src="/addImage.png"
                        alt="addImage"
                        width={20}
                        height={20}
                      ></Image>
                      Photo
                    </div>
                  );
                }}
              </CldUploadWidget>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image
                  src="/addVideo.png"
                  alt=""
                  width={20}
                  height={20}
                ></Image>
                Video
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/poll.png" alt="" width={20} height={20} />
                Poll
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/addevent.png" alt="" width={20} height={20} />
                Event
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AddPost;
