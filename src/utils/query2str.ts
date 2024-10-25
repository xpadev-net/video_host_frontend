export const query2str = (query: string | string[] | undefined): string | undefined => {
  if (!query) return;
  if (Array.isArray(query)) return query.join(",");
  return query;
}
