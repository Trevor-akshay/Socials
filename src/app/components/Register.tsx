import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Register = () => {
  return (
    <SignedOut>
      <div className="flex items-center gap-2 text-sm">
        <Image src="/login.png" alt="" width={20} height={20} />
        <Link href="/sign-in" className="text-red-600 font-bold">
          Login / Register
        </Link>
      </div>
    </SignedOut>
  );
};

export default Register;
