import Image from "next/image";

const NavSearchBar = () => {
  return (
    <div
      className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl
		"
    >
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none"
      />
      <Image
        src="/search.png"
        alt=" "
        width={14}
        height={14}
        className="inline-block ml-2 w-4 h-4 cursor-pointer"
      />
    </div>
  );
};

export default NavSearchBar;
