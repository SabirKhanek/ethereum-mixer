import { Navbar } from "../components/nav";

export default function BlogPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-grey w-full bg-[#E6E6E6] min-h-screen">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
