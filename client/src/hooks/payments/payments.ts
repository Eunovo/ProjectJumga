import { useGet } from "../../api"

export const useGetPayments = (params?: any) => useGet('/payments', { params });
export const useGetPaymentByTranxRef = (tranxRef: string) => useGet(`/payments/${tranxRef}`); 
