"use client";
import Loading from "./loading";
import React, { lazy, Suspense } from "react";

const page = () => {
  const LazyComponent = lazy(
    () => import("@/components/routes/new-match/TeamDetails"),
  );

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

export default page;
