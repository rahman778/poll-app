import Image from "next/image";
import Link from "next/link";

export default function Home() {
   return (
      <section>
         <div className="flex flex-col lg:flex-row min-h-[90vh] 2xl:min-h-[75vh] lg:gap-x-2 2xl:gap-x-4 justify-center lg:justify-between items-center">
            {/* Hero Section */}
            <div className="lg:w-[50%] pt-6 sm:pt-0">
               <div className="text-4xl lg:text-6xl 2xl:text-7xl font-medium">
                  Your Opinions, Instant Impact
               </div>
               <p className="lg:text-lg 2xl:text-xl mt-6 lg:mt-10">
                  Snap poll empowers you to express your viewpoints and see
                  real-time results. Engage in meaningful discussions, share
                  your thoughts, and witness the immediate impact of your
                  opinions.
               </p>
               <Link href="/create" className="button primary-btn px-5 mt-8 lg:mt-10">
                  Create a poll
               </Link>
            </div>
            <div className="mx-auto mt-8 lg:mt-0 bg-indigo-100 dark:bg-[#2D3748] rounded-md">
               <Image
                  src="/business.png"
                  width={650}
                  height={650}
                  alt="Picture of the author"
               />
            </div>
         </div>
         <div className="mt-10">
            <div>Lorem ipsum dollar</div>
         </div>
      </section>
   );
}
