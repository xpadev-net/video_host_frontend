const request = (url:string,option:RequestInit={}) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`,{
    ...option,
    method: 'POST',
    mode: 'cors',
    credentials: 'include'
  });
}
export {request};