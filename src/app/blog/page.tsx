import { Navbar } from "../components/nav";
import BlogSection from "./sections/BlogSection";
export default function BlogPage() {
  return (
    <div className="text-white w-full bg-grey min-h-screen">
      <Navbar></Navbar>
      <BlogSection></BlogSection>
    </div>
  );
}
