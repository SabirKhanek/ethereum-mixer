export function createSearchParams(obj: { [key: string]: any }) {
  const keys = Object.keys(obj);
  if (keys.length <= 0) return "";
  let queryString = "?";
  keys.forEach((key, index) => {
    queryString += `${index > 0 ? "&" : ""}${key}=${obj[key]}`;
  });
  return queryString;
}
