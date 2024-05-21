import Image from "next/image";

const ShopPage = () => {
  return (
    <div>
      <div className="w-full h-[500px] relative">
        <Image
          src="https://cdn.skinport.com/cdn-cgi/image/format=webp,quality=85,height=500/images/banners/b5cY0XHfPbNwXlnyZnhLpBq40awYcJNlMFgrFSly.png"
          fill
          alt="logo"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default ShopPage;
