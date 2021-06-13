import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import {CartContext} from "./context/CartContext";
import {useEffect, useState} from "react";
import {getCart, storeCart} from "./helper";
import Cart from "./pages/Cart";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

const App = () => {

    const [cart, setCart] = useState({});
    useEffect(() => {
        if(getCart())
        setCart(JSON.parse(getCart()));
    }, []);
    useEffect(() => {
        storeCart(JSON.stringify(cart));
    }, [cart]);
    return (
        <>
            <Router>
                <CartContext.Provider value={{cart, setCart}}>
                    <Navigation/>
                    <Switch>
                        <Route path={"/"} component={Home} exact/>
                        <Route path={"/cart"} component={Cart} exact/>
                        <Route path={"/about"} component={About} exact/>
                        <Route path={"/contact"} component={ContactUs} exact/>
                    </Switch>
                </CartContext.Provider>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
