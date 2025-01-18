import { lazy, Suspense } from "react";
import Loading from "./loading";
import StoreProvider from "@/store/StoreProvider";
import Sidebar from "@/components/container/Sidebar";
export default function Home() {
  const LazyComponent = lazy(() => import("../App"));

  return (
    <section>
      <Suspense fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          <StoreProvider>
            <LazyComponent />
          </StoreProvider>
        </Suspense>
      </Suspense>
    </section>
  );
}
