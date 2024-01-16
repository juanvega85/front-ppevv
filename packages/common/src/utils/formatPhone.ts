export const formatPhone = (phone?: string) => {
  if (!phone) return '';

  const isNumber = /^\d+$/.test(phone);
  const isRightLength = phone.length === 11;

  if (phone && isNumber && isRightLength) {
    return phone.replace(/[.-]/g, '').replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '$1 $2 $3 $4');
  }
  return '';
};
