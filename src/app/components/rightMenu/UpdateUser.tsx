"use client";

import { updateProfile } from "@/app/lib/actions";
import { User } from "@/generated/prisma";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };

  return (
    <div className="">
      <span
        className="text-red-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <form
            action={(formData) => {
              formAction({ formData, coverUrl: cover || "/noCover.png" });
            }}
            className="p-12 bg-white rounded-lg shadow-sm flex flex-col gap-2 w-full md:w-1/2 xl:w-1/2 relative"
          >
            {/* TITLE */}
            <h1>Update Profile</h1>
            <div className="mt-4 text-xs text-gray-500">
              Use the Navbar profile window to update your Username or Avatar
            </div>
            {/* COVER PICTURE */}
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              onSuccess={(result, { widget }) => {
                const info = result.info!;
                if (typeof info !== "string" && info.secure_url) {
                  setCover(info.secure_url);
                } else {
                  console.error("Unexpected upload result.info:", info);
                }
              }}
              onError={(error) => {
                console.error("Upload error:", error);
              }}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open?.()}
                  >
                    <label>Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={cover || user.cover || "/noCover.png"}
                        alt="cover"
                        width={48}
                        height={32}
                        className="w-12 h-8 rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-800">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="name" className="text-gray-500 text-xs">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder={user.name || "Rithik"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="name"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="surname" className="text-gray-500 text-xs">
                  Sur Name
                </label>
                <input
                  type="text"
                  placeholder={user.surname || "Muthukrishnan"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="surname"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="description" className="text-gray-500 text-xs">
                  Description
                </label>
                <input
                  type="text"
                  placeholder={user.description || "Hello, I am Rithik!"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="description"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="city" className="text-gray-500 text-xs">
                  City
                </label>
                <input
                  type="text"
                  placeholder={user.city || "Trichy"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="city"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="school" className="text-gray-500 text-xs">
                  School
                </label>
                <input
                  type="text"
                  placeholder={user.school || "NIT!"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="school"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="work" className="text-gray-500 text-xs">
                  Work
                </label>
                <input
                  type="text"
                  placeholder={user.work || "Software Engineer"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="work"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <label htmlFor="website" className="text-gray-500 text-xs">
                  Website
                </label>
                <input
                  type="text"
                  placeholder={user.website || "macha.com"}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-sm"
                  name="website"
                />
              </div>
            </div>
            {/* Update button */}
            <button className="bg-blue-500 text-white rounded-md p-2 mt-2">
              Update
            </button>
            {state.success && (
              <span className="text-green-500">Update was successful</span>
            )}
            {state.error && (
              <span className="text-red-600">Something went wrong</span>
            )}

            <div
              className="absolute text-xl self-end top-3 cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
