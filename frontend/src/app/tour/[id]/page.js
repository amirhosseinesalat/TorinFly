import TourDetails from "@/components/tour/TourDetails";
async function TourDetail({ params }) {
  const res = await fetch(`http://localhost:6500/tour/${params.id}`, {
    cache: "no-store",
  });

  const tour = await res.json();
  if (!tour.id) {
    return <h2>توری پیدا نشد</h2>;
  }

  return <TourDetails tour={tour} />;
}

export default TourDetail;
