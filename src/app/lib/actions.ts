"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prismaClient";
import z from "zod";
import { success } from "zod/v4";
import { revalidatePath } from "next/cache";

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User not authenticated");

  try {
    const exisitingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (exisitingFollow) {
      await prisma.follower.delete({
        where: {
          id: exisitingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
      if (existingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log("Follow action error ", error);
    throw new Error("Something went wrong");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User not authenticated");

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
      await prisma.followRequest.deleteMany({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });
    }
  } catch (error) {
    console.log("Block action error ", error);
    throw new Error("Something went wrong");
  }
};

export const accepteFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User not authenticated");

  try {
    const request = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (!request || request.receiverId !== currentUserId) {
      throw new Error("Invalid follow request");
    }

    await prisma.follower.create({
      data: {
        followerId: request.senderId,
        followingId: currentUserId,
      },
    });

    await prisma.followRequest.delete({
      where: {
        id: request.id,
      },
    });
  } catch (error) {
    console.log("Accept follow request error ", error);
    throw new Error("Something went wrong");
  }
};

export const rejectFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) throw new Error("User not authenticated");

  try {
    const request = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (!request || request.receiverId !== currentUserId) {
      throw new Error("Invalid follow request");
    }

    await prisma.followRequest.delete({
      where: {
        id: request.id,
      },
    });
  } catch (error) {
    console.log("Reject follow request error ", error);
    throw new Error("Something went wrong");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: { formData: FormData; coverUrl: string }
) => {
  const { userId: currentUserId } = await auth();

  if (!currentUserId) {
    return { success: false, error: true };
  }
  try {
    const fields = Object.fromEntries(payload.formData);

    const filteredFields = Object.fromEntries(
      Object.entries(fields).filter(([_, value]) => value !== "")
    );

    const Profile = z.object({
      cover: z.string().optional(),
      name: z.string().optional(),
      surname: z.string().optional(),
      description: z.string().max(255).optional(),
      city: z.string().max(50).optional(),
      school: z.string().max(50).optional(),
      work: z.string().max(50).optional(),
      website: z.string().max(50).optional(),
    });

    const validatedFields = Profile.safeParse({
      ...filteredFields,
      cover: payload.coverUrl,
    });

    if (!validatedFields.success) {
      console.log(JSON.stringify(validatedFields.error.flatten().fieldErrors));
      return { success: false, error: true };
    }

    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: validatedFields.data,
    });
    return { success: true, error: false };
  } catch (error) {
    console.log("Update profile error ", error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    console.log("Existing like: ", existingLike, userId, postId);
    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
    }
  } catch (error) {
    console.log("Like action error ", error);
    throw new Error("Something went wrong");
  }
};

export const addComment = async (postId: number, description: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  try {
    const createdComment = await prisma.comment.create({
      data: {
        desc: description,
        postId: postId,
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    return createdComment;
  } catch (error) {
    console.log("Add comment error ", error);
    throw new Error("Something went wrong");
  }
};

export const addPost = async (formData: FormData, img: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const description = formData.get("desc") as string;
  const Description = z.string().min(1).max(255);

  const validatedDescription = Description.safeParse(description);
  if (!validatedDescription.success) {
    console.log("Invalid description: ", validatedDescription.error);
    throw new Error("Invalid description");
  }

  console.log(formData, img);
  try {
    await prisma.post.create({
      data: {
        desc: description,
        img: img,
        userId: userId,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("Add post error ", error);
    throw new Error("Something went wrong");
  }
};

export const addStory = async (img: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const exisitingStory = await prisma.story.findFirst({
      where: {
        userId: userId,
      },
    });

    if (exisitingStory) {
      await prisma.story.delete({
        where: {
          id: exisitingStory.id,
        },
      });
    }
    const createdStory = await prisma.story.create({
      data: {
        img: img,
        userId: userId,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      include: {
        user: true,
      },
    });

    return createdStory;
  } catch (error) {
    console.log("Add post error ", error);
    throw new Error("Something went wrong");
  }
};

export const deletePost = async (postId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    await prisma.post.delete({
      where: {
        id: postId,
        userId: userId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log("delete post error ", error);
    throw new Error("Something went wrong");
  }
};
