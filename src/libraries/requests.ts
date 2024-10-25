import axios from "axios";

import { ApiEndpoint } from "@/contexts/env";

export const requests = axios.create({
  baseURL: ApiEndpoint,
});
