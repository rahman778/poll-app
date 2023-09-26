import Navbar from "@/components/Navigation/Navbar";

export default function AuthLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div>
         <Navbar />
         <main className="max-w-6xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
            {children}
         </main>
      </div>
   );
}
