import { ApiEndpoint } from "@/contexts/env";

const request = async <T>(url: string, option: RequestInit = {}) => {
  const req = await fetch(`${ApiEndpoint}${url}`, {
    ...option,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  return (await req.json()) as T;
};

export { request };
