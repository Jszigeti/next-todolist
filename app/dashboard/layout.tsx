// Components
import Nav from "@/components/Nav";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="max-w-[1200px] mx-auto md:flex md:items-center md:gap-4 h-screen w-full mt-2 p-2">
      <Nav />
      <div className="w-full h-full">{children}</div>
    </main>
  );
}
