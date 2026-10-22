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

// на GitHub Pages сайт живёт в подпапке, картинкам нужен её префикс
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const BRAND = "LEONERO";

// девушка без вещи — с неё начинается переключатель
export const BASE_MODEL = asset("/model/base.webp");

export const LOOKS: Look[] = [
  {
    id: "grey",
    name: "Grey Jacket",
    color: "Grey",
    swatch: "#8e8f91",
    price: 229,
    product: asset("/model/grey-garment.webp"),
    model: asset("/model/grey.webp"),
    garment: asset("/model/grey-garment.webp"),
    gallery: [asset("/products/grey-1.jpg"), asset("/products/grey-2.jpg")],
  },
  {
    id: "brown",
    name: "Mocha Jacket",
    color: "Mocha",
    swatch: "#7a6553",
    price: 229,
    product: asset("/model/brown-garment.webp"),
    model: asset("/model/brown.webp"),
    garment: asset("/model/brown-garment.webp"),
  },
  {
    id: "vest",
    name: "Latte Gilet",
    color: "Latte",
    swatch: "#c9bcae",
    price: 189,
    product: asset("/model/vest-garment.webp"),
    model: asset("/model/vest.webp"),
    garment: asset("/model/vest-garment.webp"),
  },
  {
    id: "vest-grey",
    name: "Silver Gilet",
    color: "Silver",
    swatch: "#9a9da3",
    price: 189,
    product: asset("/model/vest-grey-garment.webp"),
    model: asset("/model/vest-grey.webp"),
    garment: asset("/model/vest-grey-garment.webp"),
  },
  {
    id: "vest-black",
    name: "Noir Gilet",
    color: "Graphite",
    swatch: "#2a2b2e",
    price: 189,
    product: asset("/model/vest-black-garment.webp"),
    model: asset("/model/vest-black.webp"),
    garment: asset("/model/vest-black-garment.webp"),
  },
  {
    id: "vest-brown",
    name: "Choco Gilet",
    color: "Chocolate",
    swatch: "#5a4232",
    price: 189,
    product: asset("/model/vest-brown-garment.webp"),
    model: asset("/model/vest-brown.webp"),
    garment: asset("/model/vest-brown-garment.webp"),
  },
  {
    id: "olive",
    name: "Olive Cape",
    color: "Olive",
    swatch: "#8a9a76",
    price: 149,
    product: asset("/products/olive.png"),
    model: asset("/model/olive.webp"),
    garment: asset("/model/olive-garment.webp"),
  },
  {
    id: "taupe",
    name: "Taupe Cape",
    color: "Taupe",
    swatch: "#8b7b6d",
    price: 149,
    product: asset("/products/taupe.png"),
    model: asset("/model/taupe.webp"),
    garment: asset("/model/taupe-garment.webp"),
  },
  {
    id: "leopard",
    name: "Leo Cape",
    color: "Leopard",
    swatch: "#4a3f38",
    price: 169,
    product: asset("/products/leopard.png"),
    model: asset("/model/leopard.webp"),
    garment: asset("/model/leopard-garment.webp"),
  },
  {
    id: "ivory",
    name: "Ivory Cape",
    color: "Ivory",
    swatch: "#ece6dc",
    price: 149,
    product: asset("/products/ivory.png"),
    model: asset("/model/ivory.webp"),
    garment: asset("/model/ivory-garment.webp"),
  },
  {
    id: "noir",
    name: "Noir Cape",
    color: "Black",
    swatch: "#1c1a19",
    price: 149,
    product: asset("/products/noir.png"),
    model: asset("/model/noir.webp"),
    garment: asset("/model/noir-garment.webp"),
  },
];

const byIds = (ids: string[]) =>
  ids.map((id) => LOOKS.find((l) => l.id === id)!);

export const JACKETS = byIds(["grey", "brown"]);
export const VESTS = byIds(["vest", "vest-grey", "vest-black", "vest-brown"]);
export const CAPES = byIds(["olive", "taupe", "leopard", "ivory", "noir"]);

export const SIZES = ["XS–S", "M–L", "XL"];

// ссылка для заказа (сейчас — Instagram Direct), заменить на свою
export const ORDER_URL = "https://instagram.com/";

export const formatPrice = (p: number) => `£${p.toLocaleString("en-GB")}`;
