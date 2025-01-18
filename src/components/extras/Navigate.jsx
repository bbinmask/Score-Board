"use client";

import { useRouter } from "next/navigation";

export default function Navigate({ to }) {
  const router = useRouter();

  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => //router.push(to)}
    >
      Submit
    </button>
  );
}
