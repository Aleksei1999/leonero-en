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
};

export const BRAND = 'LEONERO';

// девушка без вещи — с неё начинается переключатель
export const BASE_MODEL = '/model/base.png';

export const LOOKS: Look[] = [
  { id: 'grey', name: 'Куртка Grey', color: 'Серый', swatch: '#8e8f91', price: 18900, product: '/model/grey-garment.png', model: '/model/grey.png', garment: '/model/grey-garment.png' },
  { id: 'brown', name: 'Куртка Mocha', color: 'Мокко', swatch: '#7a6553', price: 18900, product: '/model/brown-garment.png', model: '/model/brown.png', garment: '/model/brown-garment.png' },
  { id: 'vest', name: 'Жилет Latte', color: 'Латте', swatch: '#c9bcae', price: 15900, product: '/model/vest-garment.png', model: '/model/vest.png', garment: '/model/vest-garment.png' },
  { id: 'vest-grey', name: 'Жилет Silver', color: 'Серебристый', swatch: '#9a9da3', price: 15900, product: '/model/vest-grey-garment.png', model: '/model/vest-grey.png', garment: '/model/vest-grey-garment.png' },
  { id: 'vest-black', name: 'Жилет Noir', color: 'Графит', swatch: '#2a2b2e', price: 15900, product: '/model/vest-black-garment.png', model: '/model/vest-black.png', garment: '/model/vest-black-garment.png' },
  { id: 'vest-brown', name: 'Жилет Choco', color: 'Шоколад', swatch: '#5a4232', price: 15900, product: '/model/vest-brown-garment.png', model: '/model/vest-brown.png', garment: '/model/vest-brown-garment.png' },
  { id: 'olive', name: 'Накидка Olive', color: 'Оливковый', swatch: '#8a9a76', price: 12900, product: '/products/olive.png', model: '/model/olive.png', garment: '/model/olive-garment.png' },
  { id: 'taupe', name: 'Накидка Taupe', color: 'Тауп', swatch: '#8b7b6d', price: 12900, product: '/products/taupe.png', model: '/model/taupe.png', garment: '/model/taupe-garment.png' },
  { id: 'leopard', name: 'Накидка Leo', color: 'Леопард', swatch: '#4a3f38', price: 13900, product: '/products/leopard.png', model: '/model/leopard.png', garment: '/model/leopard-garment.png' },
  { id: 'ivory', name: 'Накидка Ivory', color: 'Молочный', swatch: '#ece6dc', price: 12900, product: '/products/ivory.png', model: '/model/ivory.png', garment: '/model/ivory-garment.png' },
  { id: 'noir', name: 'Накидка Noir', color: 'Чёрный', swatch: '#1c1a19', price: 12900, product: '/products/noir.png', model: '/model/noir.png', garment: '/model/noir-garment.png' },
];

export const SIZES = ['XS–S', 'M–L', 'XL'];

// ссылка для заказа, заменить на свой Telegram/WhatsApp
export const ORDER_URL = 'https://t.me/';

export const formatPrice = (p: number) => `${p.toLocaleString('ru-RU')} ₽`;
