"use client";

import { useRouter } from "next/navigation";

export default function NavigateToLogPage({ userLoggedIn }) {
  const router = useRouter();

  if (!userLoggedIn) {
    //router.push("sign-in");
  }

  return;
}
