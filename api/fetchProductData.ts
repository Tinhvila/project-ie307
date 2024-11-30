import { ItemProps } from '../types/types';

interface Total_Product {
  data: ItemProps[];
  totalCount: number | null;
}

const API = `http://192.168.2.7:3000/products`;

export default async function fetchProductData(
  params: {
    searchContent?: string;
    searchBrand?: string;
    currentPage?: number;
    productPerPage?: number;
    sortBy?: string;
    category?: string | null;
    subCategory?: string | null;
    ratingSelected?: number;
    isFreeShipping?: boolean;
    brandSelected?: string[];
    minPrice?: number;
    maxPrice?: number;
  } = {}
): Promise<Total_Product> {
  try {
    const queryParams = new URLSearchParams();

    if (params.currentPage) {
      queryParams.append('_page', params.currentPage.toString());
    }

    if (params.productPerPage) {
      queryParams.append('_limit', params.productPerPage.toString());
    }

    if (params.minPrice !== undefined)
      queryParams.append('price_gte', params.minPrice.toString());

    if (params.maxPrice !== undefined)
      queryParams.append('price_lte', params.maxPrice.toString());

    if (params.searchContent) {
      queryParams.append('name_like', params.searchContent);
      queryParams.append('description_like', params.searchContent);
    }

    if (params.searchBrand) {
      queryParams.append('brand', params.searchBrand);
    }

    if (params.category) {
      queryParams.append('category', params.category);
    }

    if (params.subCategory) {
      queryParams.append('subCategory', params.subCategory);
    }

    if (params.brandSelected && params.brandSelected.length) {
      params.brandSelected.forEach((brand) =>
        queryParams.append('brand', brand)
      );
    }

    if (params.sortBy) {
      queryParams.append('_sort', params.sortBy.split('_')[0]);
      queryParams.append('_order', params.sortBy.split('_')[1]);
    }
    if (params.ratingSelected) {
      queryParams.append('rating', params.ratingSelected.toString());
    }

    if (params.isFreeShipping) {
      queryParams.append('free_shipping', params.isFreeShipping.toString());
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
