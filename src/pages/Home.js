import Products from "../components/Products";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../context/CartContext";
import Counter from "../components/Counter";
import {Link} from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const {cart} = useContext(CartContext);
    useEffect(() => {
        let response = require('../assets/db.json');
        setProducts(response.products);
    }, []);
    return (
        <>
            <div className="container text-center mx-auto">
                <h1 className="font-bold text-4xl mt-10">Food delivery in Rishra</h1>
                <div className="px-64">
                    <p className="font-thin p-10 w-90">If you decide to relax or have unexpected guests, call us. We
                        make sure that
                        your vacation is comfortable, enjoyable and delicious
                    </p>
                </div>
                <div className="container">
                    <img className="object-center w-2/5 block m-auto -mt-10" src={"/images/home-pizza.png"}
                         alt="pizza"/>
                </div>
            </div>
            <div className="bg-white text-center mx-auto -mt-20 p-10">
                <h1 className="font-bold text-3xl p-20">Popular Dishes</h1>
                <div className="grid grid-cols-4 ml-10 mr-10 gap-10">
                    {
                        products.map((product) => <Products key={product.id} product={product}/>)
                    }
                </div>
            </div>
            <div className="container text-center mx-auto">
                <h2 className="font-bold text-4xl mt-10">Fill out the form and we will call you</h2>
                <div className="mt-10">
                    <input
                        className="shadow appearance-none border rounded-full py-2 px-3 mr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="Name"/>
                    <input
                        className="shadow appearance-none border w-1/4 rounded-full py-2 px-3 mr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="text" placeholder="Email"/>
                    <input type="submit" value={"Call Me"}
                           className="h-10 px-5 rounded-full text-sm focus:outline-none font-semibold"
                           style={{
                               background: "linear-gradient(180deg, #FE5626 0%, #F23F0E 100%), #59AAF1",
                               boxShadow: "0px 4px 8px rgba(205, 169, 41, 0.26)",
                               color: "white",
                               borderRadius: "59px"
                           }}/>
                    <div className="container">
                        <img className="object-center w-3/6 block m-auto" src={"/images/car.jpeg"}
                             alt="pizza"/>
                    </div>
                </div>
            </div>
            <Link to={'/cart'} style={{
                position: "fixed",
                width: "100px",
                height: "100px",
                bottom: "40px",
                right: "40px",
                background: "url(/images/add-to-cart.svg) no-repeat",
                backgroundSize: "cover",
                borderRadius: "50px",
                outline: "none"
            }}>
                {
                    parseInt(cart.totalItems) > 0 ? <Counter count={cart.totalItems}/> : ""

                }
            </Link>
        </>
    )
}


export default Home;