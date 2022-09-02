export const url = `https://api.jikan.moe/v4`;
export const getMangaSearch = (query: string, page?: number) =>
  `${url}/manga?getMangaSearch&q=${query}${page ? `&page=${page}` : ``}`;
export const getAnimeSearch = (query: string, page?: number) =>
  `${url}/anime?getAnimeSearch&q=${query}${page ? `&page=${page}` : ``}`;
export const getTop = (type: string, page: number) => {
  return `${url}/top/${type}?&page=${page}`;
};
export const getFullTitleInfo = (query: string) => {
  return `${url}${query}`;
};
export const getTitleRecommendations = (query: string) => {
  return `${url}${query}/recommendations`;
};
