export type Look = {
  id: string;
  name: string;
  color: string;
  swatch: string;
  price: number;
  product: string;
  // фото девушки в этой накидке, одна поза на всех; пока нет — показываем манекен
  model?: string;
};

export const BRAND = 'FOMENKO';

export const LOOKS: Look[] = [
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
