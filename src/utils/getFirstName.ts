export const getFirstName = (fullName?: string) => {
  if (!fullName) return '';
  return fullName.split(' ')[0];
};
