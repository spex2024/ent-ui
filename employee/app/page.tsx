"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {ClimbingBoxLoader, ClipLoader} from "react-spinners"; // Import a spinner from react-spinners

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      router.replace("/home");
      setLoading(false); // stop loading after the redirect
    }, 3000); // Optionally delay for user experience (e.g., 2 seconds)
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading && <ClimbingBoxLoader color="#71bc44" size={20} />} {/* Spinner */}
    </div>
  );
}
