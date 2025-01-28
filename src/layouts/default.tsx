import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-3">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://www.instagram.com/basarabs_cup/"
          title="Basarab's"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">A.O. FFF</p>
        </Link>
      </footer>
    </div>
  );
}
