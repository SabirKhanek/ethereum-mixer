import { Navbar } from "../components/nav";

export default function BlogPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-grey w-full bg-light-grey min-h-screen">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
