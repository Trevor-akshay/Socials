import Link from "next/link";
import Image from "next/image";

const NavCenter = () => {
  return (
    <div className="flex gap-6 text-gray-600">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/home.png"
          alt="Homepage"
          width={12}
          height={12}
          className="w-4 h-4"
        />
        <span>HomePage</span>
      </Link>
      <Link href="/friends" className="flex items-center gap-2">
        <Image
          src="/friends.png"
          alt="Friends"
          width={16}
          height={16}
          className="w-4 h-4"
        />
        <span>Friends</span>
      </Link>
      <Link href="/stories" className="flex items-center gap-2">
        <Image
          src="/stories.png"
          alt="Stories"
          width={14}
          height={14}
          className="w-4 h-4"
        />
        <span>Stories</span>
      </Link>
    </div>
  );
};

export default NavCenter;
