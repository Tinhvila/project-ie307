import React, { SetStateAction } from "react";

// Item details for item props
export interface ItemProps {
  image?: string;
  title: string;
  description?: string;
  rating?: number;
  initialPrice: number;
  discountPrice?: number;
  onAddToCart?: React.Dispatch<SetStateAction<any>>;
}
