import Image from "next/image";
import { SignedIn as ClerkSignedIn, UserButton } from "@clerk/nextjs";

const SignedIn = () => {
  return (
    <ClerkSignedIn>
      <div className="cursor-pointer">
        <Image src="/people.png" alt="" width={20} height={20} />
      </div>
      <div className="cursor-pointer">
        <Image src="/messages.png" alt="" width={20} height={20} />
      </div>
      <div className="cursor-pointer">
        <Image src="/notifications.png" alt="" width={20} height={20} />
      </div>
      <UserButton />
    </ClerkSignedIn>
  );
};

export default SignedIn;
