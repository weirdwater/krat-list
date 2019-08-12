import { QueryParameters, createQueryString } from "../helpers";

export const apiUrl = (endpoint: string, query?: QueryParameters) => `/api/v1/${endpoint}${query && createQueryString(query)}`

export * from './authentication'
