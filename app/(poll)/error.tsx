"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   useEffect(() => {
      // Log the error to an error reporting service
      console.error(error);
   }, [error]);

   return (
      <div className="grid h-screen px-4 place-content-center">
         <h1 className="tracking-widest text-black dark:text-white uppercase">
            404 | Not Found
         </h1>
      </div>
   );
}
