export type PhoneCondition = 'New' | 'Like New' | 'Good' | 'Fair';

export interface MobilePhone {
  id: string;
  brand: string;
  model: string;
  price: number;
  storage: string;
  ram: string;
  color: string;
  condition: PhoneCondition;
  image: string;
  specs: {
    screen: string;
    processor: string;
    camera: string;
    battery: string;
  };
  isFeatured?: boolean;
}

export interface CartItem extends MobilePhone {
  quantity: number;
}
