export function translateVehicle(type) {
  const vehicles = {
    airplane: "هواپیما",
    bus: "اتوبوس",
    train: "قطار",
    ship: "کشتی",
    van: "ون",
  };

  return vehicles[type] || type;
}
