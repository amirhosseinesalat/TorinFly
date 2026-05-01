import CheckoutForm from "@/components/form/CheckoutForm";

async function CheckoutPage({ params }) {
  const res = await fetch(`http://localhost:6500/tour/${params.id}`, {
    cache: "no-store",
  });

  const tour = await res.json();
  console.log("PARAMS:", params.id);
  console.log("TOUR RESPONSE:", tour);
  if (!tour?.id) {
    return <h2>توری پیدا نشد</h2>;
  }

  return <CheckoutForm tour={tour} />;
}

export default CheckoutPage;
