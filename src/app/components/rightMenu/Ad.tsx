import Image from "next/image";

const Ad = () => {
  return (
    <div className="bg-white rounded-lg shadow-md text-sm flex justify-between flex-col p-4">
      {/*Top */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>
      {/*bottom */}
      <div className="flex flex-col mt-4 gap-4">
        <div className="relative w-full h-48">
          <Image
            src="https://images.pexels.com/assets/static/images/canva/photo-background-remover.png?w=1200"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/assets/static/images/canva/photo-background-remover.png?w=1200"
            alt=""
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">Canva</span>
        </div>
        <p className="text-sm">
          {`Explore thousands of beautiful free templates. With Canva's drag and
          drop feature, you can customize your design for any occasion in just a
          few clicks`}
        </p>
		<button className="bg-gray-200 text-gray-500 text-xs rounded-lg h-6">
			Learn more
		</button>
      </div> 
    </div>
  );
};

export default Ad;
