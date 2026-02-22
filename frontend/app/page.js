import Banner from "../modules/Banner";
import MainBanner from "../modules/MainBanner";
import Search from "../modules/Search";
import Tours from "../modules/Tours";

export default function Home() {
  return (
    <div>
      <Banner />
      <Search />
      <Tours />
      <MainBanner />
    </div>
  );
}
