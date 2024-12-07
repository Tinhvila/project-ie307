import { ItemProps } from '../types/types';

interface Total_Product {
  data: ItemProps[];
  totalCount: number | null;
}

// ở nhà
const API = `http://192.168.2.7:3000/products`;
// const API = `http://10.100.9.42:3000/products`;

// 3G
// const API = `http://172.20.10.4:3000/products`;

export default async function fetchProductData(
  params: {
    priceSort?: string | null;
    // priceFilter?: number;
    ratingFilter?: number[];
    minPrice?: number;
    maxPrice?: number;
    brandSelected?: string | null;
    tag?: number | null;
  } = {}
): Promise<Total_Product> {
  try {
    const queryParams = new URLSearchParams();

    if (params.priceSort) {
      queryParams.append('_sort', 'discountPrice');
      queryParams.append('_order', params.priceSort);
    }

    if (params.minPrice) {
      queryParams.append('discountPrice_gte', params.minPrice.toString());
    }

    if (params.maxPrice) {
      queryParams.append('discountPrice_lte', params.maxPrice.toString());
    }

    if (params.ratingFilter && params.ratingFilter.length) {
      params.ratingFilter.forEach((ratingFilter) =>
        queryParams.append('rating', ratingFilter.toString())
      );
    }

    if (params.tag) {
      if (params.tag === 1) queryParams.append('isHotDeal', 'true');
      if (params.tag === 2) queryParams.append('isUpcomingEvent', 'true');
      if (params.tag === 3) queryParams.append('isNewProduct', 'true');
    }

    if (params.brandSelected) {
      queryParams.append('brand', params.brandSelected);
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
