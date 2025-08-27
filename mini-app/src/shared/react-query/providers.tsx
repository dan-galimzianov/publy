"use client";
import { PropsWithChildren } from "react";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";

export function QueryClientProvider({ children }: PropsWithChildren) {
  const client = getQueryClient();
  return (
    <TanstackQueryClientProvider client={client}>
      {children}
    </TanstackQueryClientProvider>
  );
}