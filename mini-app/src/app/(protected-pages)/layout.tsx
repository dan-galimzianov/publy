import { PrefetchProvider, ProtectedLayout } from "@/providers";
import { Navbar, PageLoader } from "@/shared/ui";
import { Suspense } from "react";
import { Toaster } from "@/shared/ui/sonner";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <PrefetchProvider>
        <div className="flex min-h-screen flex-col">
          <div className="bg-white flex flex-col flex-1">
            <div className="w-full flex-1 overflow-auto flex flex-col">
              <Suspense fallback={<PageLoader fullScreen />}>{children}</Suspense>
            </div>
          </div>
          <Navbar />
        </div>
      </PrefetchProvider>
      <Toaster/>
    </ProtectedLayout>
  );
}