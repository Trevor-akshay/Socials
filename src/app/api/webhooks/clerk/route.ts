import { prisma } from "@/app/lib/prismaClient";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    // console.log(
    //   `Received webhook with ID ${id} and event type of ${eventType}`
    // );
    console.log("Webhook payload:");

    if (eventType === "user.created") {
      try {
        await prisma.user.create({
          data: {
            id: evt.data.id,
            username: evt.data.username!,
            email: evt.data.email_addresses[0]?.email_address || "",
            avatar: evt.data.image_url! || "/noAvatar.png",
            cover: "/noCover.png",
          },
        });
        return new Response("User created successfully", { status: 200 });
      } catch (error) {
        console.log("clerk create route: ", error);
        return new Response("Error processing user.created event", {
          status: 500,
        });
      }
    }

    if (eventType === "user.updated") {
      try {
        const updateData: any = {};

	if (evt.data.username !== undefined && evt.data.username !== null) {
          updateData.username = evt.data.username;
        }

        if (evt.data.image_url !== undefined && evt.data.image_url !== null) {
          updateData.avatar = evt.data.image_url;
        }

        await prisma.user.update({
          where: {
            id: evt.data.id,
          },
          data: updateData,
        });
        return new Response("User has been updated", { status: 200 });
      } catch (error) {
        console.log("clerk update route: ", error);
        return new Response("Error processing user.updated event", {
          status: 500,
        });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
