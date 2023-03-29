const request = async<T>(url:string,option:RequestInit={})=>{
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`,{
    ...option,
    method: 'POST',
    mode: 'cors',
    credentials: 'include'
  });
  return await req.json() as T;
}

export {request};