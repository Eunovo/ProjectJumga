import { useGet } from "../../api";


export const useGetPayouts = (params: any) => useGet("/payouts", { params });

export const useGetLastPayout = () => useGet("/payouts/last");
