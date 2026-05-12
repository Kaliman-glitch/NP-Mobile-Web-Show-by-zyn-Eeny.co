import { MobilePhone } from '../types';

export const MOCK_PHONES: MobilePhone[] = [
  {
    id: 'p1',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    price: 45900,
    storage: '512GB',
    ram: '12GB',
    color: 'Titanium Gray',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1707166113887-fb2526543b5a?q=80&w=800&auto=format&fit=crop',
    specs: {
      screen: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 3 Gen 3',
      camera: '200MP Main / 50MP Tele',
      battery: '5000mAh'
    },
    isFeatured: true
  },
  {
    id: 'p2',
    brand: 'Google',
    model: 'Pixel 8 Pro',
    price: 34900,
    storage: '256GB',
    ram: '12GB',
    color: 'Bay Blue',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
    specs: {
      screen: '6.7" Super Actua Display',
      processor: 'Google Tensor G3',
      camera: '50MP / 48MP / 48MP',
      battery: '5050mAh'
    }
  },
  {
    id: 'p3',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    price: 41900,
    storage: '256GB',
    ram: '8GB',
    color: 'Natural Titanium',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    specs: {
      screen: '6.7" ProMotion OLED',
      processor: 'A17 Pro Chip',
      camera: '48MP / 12MP / 12MP',
      battery: '4441mAh'
    },
    isFeatured: true
  },
  {
    id: 'p4',
    brand: 'OnePlus',
    model: '12',
    price: 27900,
    storage: '512GB',
    ram: '16GB',
    color: 'Silky Black',
    condition: 'New',
    image: 'https://images.unsplash.com/photo-1710156943806-0564619a3b61?q=80&w=800&auto=format&fit=crop',
    specs: {
      screen: '6.82" ProXDR Display',
      processor: 'Snapdragon 3 Gen 3',
      camera: '50MP / 64MP / 48MP',
      battery: '5400mAh'
    }
  },
  {
    id: 'p5',
    brand: 'Samsung',
    model: 'Galaxy Z Fold 5',
    price: 52900,
    storage: '512GB',
    ram: '12GB',
    color: 'Icy Blue',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800&auto=format&fit=crop',
    specs: {
      screen: '7.6" Main / 6.2" Cover',
      processor: 'Snapdragon 2 Gen 2',
      camera: '50MP / 12MP / 10MP',
      battery: '4400mAh'
    }
  },
  {
    id: 'p6',
    brand: 'Apple',
    model: 'iPhone 13',
    price: 16900,
    storage: '128GB',
    ram: '4GB',
    color: 'Starlight',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1633113214146-17188899c81b?q=80&w=800&auto=format&fit=crop',
    specs: {
      screen: '6.1" Super Retina',
      processor: 'A15 Bionic',
      camera: '12MP Dual',
      battery: '3227mAh'
    }
  }
];
