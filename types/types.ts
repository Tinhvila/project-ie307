// Item details for item props
export interface ItemProps {
  id: string;
  image?: string;
  title: string;
  description?: string;
  rating: number;
  initialPrice: number;
  discountPrice: number;
  maxTotalItem?: number;
  brand?: string;
  category?: string;
  subCategory?: string;
  isNewProduct?: boolean;
  isHotDeal?: boolean;
}

export interface UserProps {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  cart?: [
    {
      id: string; //Id from ItemProps
      image: string;
      title: string;
      quantity: number;
      initialprice: number; // Check from the initialPrice and discountPrice like: (discountPrice ? discountPrice : initialPrice)
      totalPrice: number;
    }
  ];
  order?: [
    {
      // Update in the future
    }
  ];
  favorite?: string[]; //Item id as string
  searchHistory?: string[];
}
