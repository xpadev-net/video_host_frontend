export const buildQueryParams = (
  params: Record<string, string | number | boolean | undefined>,
) => {
  const urlSearchParam = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlSearchParam.append(key, value.toString());
    }
  });
  return urlSearchParam.toString();
};
