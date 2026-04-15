export type Bike = {
  id: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  price: number;
  currency: "EUR" | "RON";
  type: "new" | "used";
  category: "sport" | "touring" | "naked" | "adventure" | "cruiser" | "scooter";
  engine: string;
  power: string;
  color: string;
  image: string;
  featured: boolean;
  available: boolean;
};

export const bikes: Bike[] = [
  {
    id: "ducati-panigale-v4s",
    brand: "Ducati",
    model: "Panigale V4 S",
    year: 2024,
    km: 0,
    price: 32990,
    currency: "EUR",
    type: "new",
    category: "sport",
    engine: "1103cc V4",
    power: "215 CP",
    color: "Ducati Red",
    image: "/bikes/panigale-v4s.jpg",
    featured: true,
    available: true,
  },
  {
    id: "ducati-multistrada-v4",
    brand: "Ducati",
    model: "Multistrada V4",
    year: 2023,
    km: 4200,
    price: 24500,
    currency: "EUR",
    type: "used",
    category: "adventure",
    engine: "1158cc V4",
    power: "170 CP",
    color: "Ducati Red / Black",
    image: "/bikes/multistrada-v4.jpg",
    featured: true,
    available: true,
  },
  {
    id: "indian-scout",
    brand: "Indian",
    model: "Scout",
    year: 2024,
    km: 0,
    price: 15990,
    currency: "EUR",
    type: "new",
    category: "cruiser",
    engine: "1133cc V-Twin",
    power: "100 CP",
    color: "Thunder Black",
    image: "/bikes/indian-scout.jpg",
    featured: true,
    available: true,
  },
  {
    id: "benelli-trk502",
    brand: "Benelli",
    model: "TRK 502",
    year: 2023,
    km: 8700,
    price: 5800,
    currency: "EUR",
    type: "used",
    category: "adventure",
    engine: "500cc Parallel Twin",
    power: "48 CP",
    color: "Matte Black",
    image: "/bikes/trk502.jpg",
    featured: true,
    available: true,
  },
  {
    id: "ducati-monster",
    brand: "Ducati",
    model: "Monster",
    year: 2022,
    km: 11200,
    price: 12900,
    currency: "EUR",
    type: "used",
    category: "naked",
    engine: "937cc L-Twin",
    power: "111 CP",
    color: "Arctic White",
    image: "/bikes/monster.jpg",
    featured: false,
    available: true,
  },
  {
    id: "italian-jet-off50",
    brand: "Italjet",
    model: "Dragster 125",
    year: 2024,
    km: 0,
    price: 4290,
    currency: "EUR",
    type: "new",
    category: "scooter",
    engine: "125cc Single",
    power: "15 CP",
    color: "Titanium Silver",
    image: "/bikes/italjet-dragster.jpg",
    featured: false,
    available: true,
  },
];

export const brands = [
  { name: "Ducati", logo: "/brands/ducati.svg", type: "new" as const },
  { name: "Indian", logo: "/brands/indian.svg", type: "new" as const },
  { name: "Benelli", logo: "/brands/benelli.svg", type: "new" as const },
  { name: "Italjet", logo: "/brands/italjet.svg", type: "new" as const },
  { name: "Malaguti", logo: "/brands/malaguti.svg", type: "new" as const },
  { name: "Lambretta", logo: "/brands/lambretta.svg", type: "new" as const },
];

export const testimonials = [
  {
    id: 1,
    name: "Alexandru Popa",
    role: "Ducati owner",
    text: "Serviciu impecabil! Am cumpărat Panigale V4 și totul a fost perfect de la test drive până la livrare. Recomand cu căldură!",
    rating: 5,
    avatar: "AP",
  },
  {
    id: 2,
    name: "Mihai Ionescu",
    role: "Adventure rider",
    text: "Am închiriat o motocicletă pentru un tur în Ardeal. Moto-ul era perfect pregătit, prețul corect. Voi reveni cu siguranță!",
    rating: 5,
    avatar: "MI",
  },
  {
    id: 3,
    name: "Cristina Moldovan",
    role: "First-time buyer",
    text: "Ca începătoare, m-au ajutat să aleg motocicleta potrivită fără presiune. O echipă de profesioniști adevărați.",
    rating: 5,
    avatar: "CM",
  },
  {
    id: 4,
    name: "Robert Stancu",
    role: "Indian Scout owner",
    text: "Am stat la Moto Hotel și am cumpărat Indian Scout-ul meu. Combinație perfectă — cazare excelentă și dealer de top.",
    rating: 5,
    avatar: "RS",
  },
];
