"use client";

import { Story, User } from "@/generated/prisma";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Fragment, useOptimistic, useState } from "react";
import { addStory } from "../lib/actions";

type StoryWithUser = Story & {
  user: User;
};
const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList, setStoryList] = useState(stories);
  const [image, setImage] = useState<any>();

  const { user, isLoaded } = useUser();

  const [optimisticStories, addOptimisticStory] = useOptimistic(
    storyList,
    (state, value: StoryWithUser) => [value, ...state]
  );

  const add = async () => {
    if (!image?.secure_url) return;

    addOptimisticStory({
      id: Math.random(),
      img: image.secure_url,
      createdAt: new Date(Date.now()),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        username: "Uploading",
        avatar: user?.imageUrl || "/noAvatar.png",
        name: "",
        surname: "",
        cover: "",
        city: "",
        description: "",
        work: "",
        school: "",
        website: "",
        email: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {
      const createdStory = await addStory(image.secure_url);
      setStoryList((prev) => [...prev, createdStory]);
      setImage(null);
    } catch (error) {
      console.log("Error in createdStory_ OptimisticHook: ", error);
    }
  };

  return (
    <Fragment>
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
            <div className="flex flex-col items-center gap-2 cursor-pointer relative">
              <Image
                src={image?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt="avatar"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 ring-red-300 opacity-60 object-cover"
                onClick={() => open?.()}
              />
              {image ? (
                <form action={() => add()}>
                  <button className="text-xs bg-blue-500 p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add Story</span>
              )}
              <div className="absolute text-6xl text-gray-800 top-1">+</div>
            </div>
          );
        }}
      </CldUploadWidget>
      {/* STORY */}
      {optimisticStories.map((story) => {
        return (
          <div
            className="flex flex-col items-center gap-2 cursor-pointer"
            key={story.id}
          >
            <Image
              src={story.user.avatar || "/noAvatar.png"}
              alt="avatar"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full ring-2 ring-red-300"
            ></Image>
            <span className="text-xs">
              {story.user.name && story.user.surname
                ? story.user.name + " " + story.user.surname
                : story.user.username}
            </span>
          </div>
        );
      })}
    </Fragment>
  );
};

export default StoryList;
