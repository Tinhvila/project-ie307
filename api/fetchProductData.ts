import { ItemProps } from '../types/types';

interface Total_Product {
  data: ItemProps[];
  totalCount: number | null;
}

const API = `http://192.168.2.7:3000/products`;
// const API = `http://172.20.10.4:3000/products`;

export default async function fetchProductData(
  params: {
    priceSort?: 'asc' | 'desc';
    priceFilter?: number;
    ratingFilter?: number;
  } = {}
): Promise<Total_Product> {
  try {
    const queryParams = new URLSearchParams();

    if (params.priceSort) {
      queryParams.append('_sort', 'discountPrice');
      queryParams.append('_order', params.priceSort);
    }

    if (params.priceFilter) {
      queryParams.append('discountPrice_gte', params.priceFilter.toString());
    }

    if (params.ratingFilter) {
      queryParams.append('rating_gte', params.ratingFilter.toString());
    }

    const apiUrl = `${API}?${queryParams.toString()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const totalCount = response.headers.get('X-Total-Count');
    const total = totalCount ? parseInt(totalCount, 10) : null;
    const data: ItemProps[] = await response.json();

    return { data, totalCount: total };
  } catch (error) {
    console.error('Error fetching product data:', error);
    return { data: [], totalCount: null };
  }
}

export { fetchProductData };
