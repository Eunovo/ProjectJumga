import { useGet } from "../../api";

export const useGetRefunds = (params?: any) => useGet('/refunds', { params });
