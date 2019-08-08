import { QueryParameters, createQueryString } from "../helpers";

export const apiUrl = (endpoint: string, query?: QueryParameters) => `/api/v1/${endpoint}${createQueryString(query)}`
