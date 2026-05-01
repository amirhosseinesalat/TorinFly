import Banner from "@/modules/ui/Banner";
import MainBanner from "@/modules/ui/MainBanner";
import Search from "@/modules/ui/Search";
import ShortDescription from "@/modules/ui/ShortDescription";
import WhyUs from "@/modules/ui/WhyUs";
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
