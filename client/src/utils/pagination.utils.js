export const getCountPages = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
}