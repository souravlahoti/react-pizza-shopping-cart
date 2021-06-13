import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4">
                <Link to={"/"}><img src={"/images/logo.png"} alt="logo" style={{
                    width: "100px",
                    height: "60px",
                }}/></Link>
                <ul className="flex items-center">
                    <li className="ml-10 mt-2 text-lg"><Link to={"/"}>Home</Link></li>
                    <li className="ml-10 mt-2 text-lg"><Link to={"/about"}>About us</Link></li>
                    <li className="ml-10 mt-2 text-lg"><Link to={"/contact"}>Contacts</Link></li>
                    <li className="ml-10 mt-2 text-lg">
                        <div className="float-left mt-2"><span className="dot" /></div>
                        <Link to={"/"}>Daily 11am - 9pm</Link>
                    </li>
                    <li className="ml-10 mt-2 text-lg font-normal"><Link to={"/"}><img className="mr-1" src={"/images/call.svg"} alt={"call"} style={{
                        display: "inline-block",
                    }}/><b>0 800 33 08 98</b></Link></li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;