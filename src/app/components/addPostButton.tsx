"use client";

import { useFormStatus } from "react-dom";
import Spinner from "./Spinnter";

const AddPostButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? <Spinner /> : "Add Post"}
    </button>
  );
};

export default AddPostButton;
