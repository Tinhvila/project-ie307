import { ItemProps } from "../types/types";
import { API } from "./fetchIp";

interface Total_Product {
  data: ItemProps[];
  totalCount: number | null;
}

export default async function fetchProductData(
  params: {
    filterId?: string | null;
    priceSort?: string | null;
    filterTitle?: string | null;
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
      queryParams.append("_sort", "discountPrice");
      queryParams.append("_order", params.priceSort);
    }

    if (params.minPrice) {
      queryParams.append("discountPrice_gte", params.minPrice.toString());
    }

    if (params.maxPrice) {
      queryParams.append("discountPrice_lte", params.maxPrice.toString());
    }

    if (params.ratingFilter && params.ratingFilter.length) {
      params.ratingFilter.forEach((ratingFilter) =>
        queryParams.append("rating", ratingFilter.toString())
      );
    }

    if (params.tag) {
      if (params.tag === 1) queryParams.append("isHotDeal", "true");
      if (params.tag === 2) queryParams.append("isUpcomingEvent", "true");
      if (params.tag === 3) queryParams.append("isNewProduct", "true");
    }

    if (params.brandSelected) {
      queryParams.append("brand", params.brandSelected);
    }

    if (params.filterTitle) {
      queryParams.append("title_like", params.filterTitle);
    }

    if (params.filterId) {
      queryParams.append("id", params.filterId);
    }

    const apiUrl = `${API}?${queryParams.toString()}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const totalCount = response.headers.get("X-Total-Count");
    const total = totalCount ? parseInt(totalCount, 10) : null;
    const data: ItemProps[] = await response.json();

    return { data, totalCount: total };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { data: [], totalCount: null };
  }
}

export { fetchProductData };
