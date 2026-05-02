export default async function sitemap() {
  const staticRouts = [
    "",
    "/checkout",
    "/edit-profile",
    "/profile",
    "/tour",
    "/my-tours",
    "/transaction",
  ];

  let data = [];
  let data2 = [];

  try {
    const checkoutRouts = await fetch("http://localhost:6500/checkout");
    if (checkoutRouts.ok) {
      data = await checkoutRouts.json();
    }
  } catch (error) {
    console.log("checkout error", error);
  }

  try {
    const tourRouts = await fetch("http://localhost:6500/tour");
    if (tourRouts.ok) {
      data2 = await tourRouts.json();
    }
  } catch (error) {
    console.log("tour error", error);
  }

  const routs = staticRouts.map((route) => ({
    url: `http://localhost:3000${route}`,
    lastModified: new Date().toString(),
  }));

  const checkout = Array.isArray(data)
    ? data.map((route) => ({
        url: `http://localhost:3000/order/${route.id}`,
        lastModified: new Date().toString(),
      }))
    : [];

  const tour = Array.isArray(data2)
    ? data2.map((route) => ({
        url: `http://localhost:3000/tour/${route.id}`,
        lastModified: new Date().toString(),
      }))
    : [];

  return [...routs, ...checkout, ...tour];
}
