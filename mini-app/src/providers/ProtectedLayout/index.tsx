"use client";

import { useMiniAppAuthMutation } from "@/repository/mutations";
import { Suspense, useEffect, useState } from "react";
import { retrieveRawInitData } from "@telegram-apps/sdk";
import { ErrorState, PageLoader } from "@/shared/ui";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const initData =
    typeof window !== "undefined" ? retrieveRawInitData() : undefined;

  const { mutate: telegramAuth, isError } = useMiniAppAuthMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (initData) {
      telegramAuth({ initData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return <ErrorState title="Ошибка авторизации" description="Попробуйте перезагрузить страницу." />;
  }

  if (isLoading) {
    return <PageLoader fullScreen />;
  }

  return (
    <Suspense fallback={<PageLoader fullScreen />}>{children}</Suspense>
  );
}
