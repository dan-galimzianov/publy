import { useMutation } from "@tanstack/react-query";
import { clientApi } from "@/shared/api/client";
import {
  type GenerateSystemRolesRequest,
  type GenerateSystemRolesResponse,
  type GenerateTargetAudiencesRequest,
  type GenerateTargetAudiencesResponse,
  type GeneratePostStructuresRequest,
  type GeneratePostStructuresResponse,
  type GenerateFinalPostRequest,
  type GenerateFinalPostResponse,
} from "@/shared/api/endpoints";

export const useGenerateSystemRolesMutation = () => {
  return useMutation<
    GenerateSystemRolesResponse,
    Error,
    GenerateSystemRolesRequest
  >({
    mutationFn: (data) => clientApi.generateSystemRoles(data),
  });
};

export const useGenerateTargetAudiencesMutation = () => {
  return useMutation<
    GenerateTargetAudiencesResponse,
    Error,
    GenerateTargetAudiencesRequest
  >({
    mutationFn: (data) => clientApi.generateTargetAudiences(data),
  });
};

export const useGeneratePostStructuresMutation = () => {
  return useMutation<
    GeneratePostStructuresResponse,
    Error,
    GeneratePostStructuresRequest
  >({
    mutationFn: (data) => clientApi.generatePostStructures(data),
  });
};

export const useGenerateFinalPostMutation = () => {
  return useMutation<
    GenerateFinalPostResponse,
    Error,
    GenerateFinalPostRequest
  >({
    mutationFn: (data) => clientApi.generateFinalPost(data),
  });
};
