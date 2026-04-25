import Banner from "../modules/Banner";
import MainBanner from "../modules/MainBanner";
import Search from "../modules/Search";
import ShortDescription from "../modules/ShortDescription";
import WhyUs from "../modules/WhyUs";
import { Toaster } from "react-hot-toast";
function HomePage() {
  
  return (
    <>
      <Toaster position="top-center" />
      <Banner />
      <Search />
      <MainBanner />
      <WhyUs />
      <ShortDescription />
    </>
  );
}

export default HomePage;
