import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Spinner from "./Spinnter";
import SignedIn from "./SignedIn";
import Register from "./Register";
import NavCenter from "./NavCenter";
import NavSearchBar from "./NavSearchBar";

const NavBar = () => {
  return (
    <div className="h-24 flex items-center justify-between">
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="w-8 h-8">
          <Image src="/socials.png" alt="logo" height={48} width={48} className="w-12 h-12"/>
        </Link>
      </div>
      <div className="hidden md:flex w-[50%] text-small items-center justify-between">
        <NavCenter />
        <NavSearchBar />
      </div>
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end ">
        <ClerkLoading>
          <Spinner />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn />
          <Register />
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
};

export default NavBar;
