import i18n from 'i18next';

export const formatPrice = (price: number): string => {
  const language = i18n.language;

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: language === 'vi' ? 'VND' : 'USD',
    minimumFractionDigits: 0,
  };

  return new Intl.NumberFormat(language === 'vi' ? 'vi-VN' : 'en-US', options)
    .format(price)
    .replace(' ', '');
};
