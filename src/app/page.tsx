import { Navbar } from "./components/nav";
import { Features } from "./components/features";

export default function Home() {
  return (
    <div className="text-white w-full bg-grey">
      <Navbar></Navbar>
      <Features></Features>
    </div>
  );
}
