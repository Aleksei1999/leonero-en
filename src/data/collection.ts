export type Look = {
  id: string;
  name: string;
  color: string;
  swatch: string;
  price: number;
  product: string;
  // фото девушки в этой вещи (16:9, тот же кадр, что BASE_MODEL); пока нет — вещь проезжает мимо
  model?: string;
  // только вещь на том же 16:9 холсте — её «надевают» на модель
  garment?: string;
  // два фото для карточки товара: первое уезжает вверх, второе выезжает снизу
  gallery?: [string, string];
};

export const BRAND = "LEONERO";

// девушка без вещи — с неё начинается переключатель
export const BASE_MODEL = "/model/base.webp";

export const LOOKS: Look[] = [
  {
    id: "grey",
    name: "Куртка Grey",
    color: "Серый",
    swatch: "#8e8f91",
    price: 18900,
    product: "/model/grey-garment.webp",
    model: "/model/grey.webp",
    garment: "/model/grey-garment.webp",
    gallery: ["/products/grey-1.jpg", "/products/grey-2.jpg"],
  },
  {
    id: "brown",
    name: "Куртка Mocha",
    color: "Мокко",
    swatch: "#7a6553",
    price: 18900,
    product: "/model/brown-garment.webp",
    model: "/model/brown.webp",
    garment: "/model/brown-garment.webp",
  },
  {
    id: "vest",
    name: "Жилет Latte",
    color: "Латте",
    swatch: "#c9bcae",
    price: 15900,
    product: "/model/vest-garment.webp",
    model: "/model/vest.webp",
    garment: "/model/vest-garment.webp",
  },
  {
    id: "vest-grey",
    name: "Жилет Silver",
    color: "Серебристый",
    swatch: "#9a9da3",
    price: 15900,
    product: "/model/vest-grey-garment.webp",
    model: "/model/vest-grey.webp",
    garment: "/model/vest-grey-garment.webp",
  },
  {
    id: "vest-black",
    name: "Жилет Noir",
    color: "Графит",
    swatch: "#2a2b2e",
    price: 15900,
    product: "/model/vest-black-garment.webp",
    model: "/model/vest-black.webp",
    garment: "/model/vest-black-garment.webp",
  },
  {
    id: "vest-brown",
    name: "Жилет Choco",
    color: "Шоколад",
    swatch: "#5a4232",
    price: 15900,
    product: "/model/vest-brown-garment.webp",
    model: "/model/vest-brown.webp",
    garment: "/model/vest-brown-garment.webp",
  },
  {
    id: "olive",
    name: "Накидка Olive",
    color: "Оливковый",
    swatch: "#8a9a76",
    price: 12900,
    product: "/products/olive.png",
    model: "/model/olive.webp",
    garment: "/model/olive-garment.webp",
  },
  {
    id: "taupe",
    name: "Накидка Taupe",
    color: "Тауп",
    swatch: "#8b7b6d",
    price: 12900,
    product: "/products/taupe.png",
    model: "/model/taupe.webp",
    garment: "/model/taupe-garment.webp",
  },
  {
    id: "leopard",
    name: "Накидка Leo",
    color: "Леопард",
    swatch: "#4a3f38",
    price: 13900,
    product: "/products/leopard.png",
    model: "/model/leopard.webp",
    garment: "/model/leopard-garment.webp",
  },
  {
    id: "ivory",
    name: "Накидка Ivory",
    color: "Молочный",
    swatch: "#ece6dc",
    price: 12900,
    product: "/products/ivory.png",
    model: "/model/ivory.webp",
    garment: "/model/ivory-garment.webp",
  },
  {
    id: "noir",
    name: "Накидка Noir",
    color: "Чёрный",
    swatch: "#1c1a19",
    price: 12900,
    product: "/products/noir.png",
    model: "/model/noir.webp",
    garment: "/model/noir-garment.webp",
  },
];

const byIds = (ids: string[]) =>
  ids.map((id) => LOOKS.find((l) => l.id === id)!);

export const JACKETS = byIds(["grey", "brown"]);
export const VESTS = byIds(["vest", "vest-grey", "vest-black", "vest-brown"]);
export const CAPES = byIds(["olive", "taupe", "leopard", "ivory", "noir"]);

export const SIZES = ["XS–S", "M–L", "XL"];

// ссылка для заказа, заменить на свой Telegram/WhatsApp
export const ORDER_URL = "https://t.me/";

export const formatPrice = (p: number) => `${p.toLocaleString("ru-RU")} ₽`;
