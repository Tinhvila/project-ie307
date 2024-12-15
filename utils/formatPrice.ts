export const formatPrice = (price: number): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  };

  return new Intl.NumberFormat('vi-VN', options).format(price).replace(' ', '');
};
