const cityMap = {
  Tehran: "تهران",
  Isfahan: "اصفهان",
  Sanandaj: "سنندج",
  Madrid: "مادرید",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
  Sulaymaniyah: "سلیمانیه",
};
export function translateCity(name) {
  return cityMap[name] || name;
}
