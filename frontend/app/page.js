import Banner from "../modules/Banner";
import MainBanner from "../modules/MainBanner";
import Search from "../modules/Search";
import Tours from "../modules/Tours";
import WhyUs from "../modules/WhyUs";

export default function Home() {
  return (
    <>
      <Banner />
      <Search />
      <Tours />
      <MainBanner />
      <WhyUs />
    </>
  );
}
