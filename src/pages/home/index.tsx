import { Features } from "./sections/features";
import { Navbar } from "./sections/nav";

export function Home(){
    return(
        <div className="text-white w-full bg-grey">
            <Navbar></Navbar>
            <Features></Features>
        </div>
    )
}