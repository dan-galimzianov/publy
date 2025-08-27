import { useQuery } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import {
  type GetPlatformsResponse,
  type GetFormatsResponse,
  type GetTonesResponse,
  type GetModelsResponse,
} from "@/shared/api/endpoints";

export const usePlatformsQuery = () => {
  return useQuery<GetPlatformsResponse>({
    queryKey: ["platforms"],
    queryFn: () => clientApi.getPlatforms(),
    staleTime: 1000 * 60 * 60, // 1 час - данные статичные
  });
};

export const useFormatsQuery = () => {
  return useQuery<GetFormatsResponse>({
    queryKey: ["formats"],
    queryFn: () => clientApi.getFormats(),
    staleTime: 1000 * 60 * 60, // 1 час - данные статичные
  });
};

export const useTonesQuery = () => {
  return useQuery<GetTonesResponse>({
    queryKey: ["tones"],
    queryFn: () => clientApi.getTones(),
    staleTime: 1000 * 60 * 60, // 1 час - данные статичные
  });
};

export const useModelsQuery = () => {
  return useQuery<GetModelsResponse>({
    queryKey: ["models"],
    queryFn: () => clientApi.getModels(),
    staleTime: 1000 * 60 * 60, // 1 час - данные статичные
  });
};
