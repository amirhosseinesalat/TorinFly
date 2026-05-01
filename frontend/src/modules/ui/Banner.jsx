import Image from "next/image";
function Banner() {
  return (
    <div>
      <Image
        src="/images/hero.png"
        alt="banner tor"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "20%" }}
      />
    </div>
  );
}

export default Banner;
