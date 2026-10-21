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
  { id: 'olive', name: 'Накидка Olive', color: 'Оливковый', swatch: '#8a9a76', price: 12900, product: '/products/olive.png' },
  { id: 'taupe', name: 'Накидка Taupe', color: 'Тауп', swatch: '#8b7b6d', price: 12900, product: '/products/taupe.png' },
  { id: 'leopard', name: 'Накидка Leo', color: 'Леопард', swatch: '#4a3f38', price: 13900, product: '/products/leopard.png' },
  { id: 'ivory', name: 'Накидка Ivory', color: 'Молочный', swatch: '#ece6dc', price: 12900, product: '/products/ivory.png' },
  { id: 'noir', name: 'Накидка Noir', color: 'Чёрный', swatch: '#1c1a19', price: 12900, product: '/products/noir.png' },
];

export const SIZES = ['XS–S', 'M–L', 'XL'];

// ссылка для заказа, заменить на свой Telegram/WhatsApp
export const ORDER_URL = 'https://t.me/';

export const formatPrice = (p: number) => `${p.toLocaleString('ru-RU')} ₽`;
