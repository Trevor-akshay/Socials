import Link from "next/link";
import ProfileCard from "./ProfileCard";
import Image from "next/image";

const LeftMenu = ({ userId }: { userId?: string }) => {
  return (
    <div className="flex flex-col gap-6">
      {!userId ? (
        <>
          <ProfileCard />
        </>
      ) : null}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/posts.png" alt="" width={20} height={20} />
          <span>My Posts</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/activity.png" alt="" width={20} height={20} />
          <span>Activity</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/market.png" alt="" width={20} height={20} />
          <span>MarketPlace</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/events.png" alt="" width={20} height={20} />
          <span>Events</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/albums.png" alt="" width={20} height={20} />
          <span>Albums</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/videos.png" alt="" width={20} height={20} />
          <span>Videos</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
        <Link
          href="/"
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <Image src="/settings.png" alt="" width={20} height={20} />
          <span>Settings</span>
        </Link>
        <hr className="border-t-1 border-gray-50 w-36 self-center " />
      </div>
    </div>
  );
};

export default LeftMenu;
