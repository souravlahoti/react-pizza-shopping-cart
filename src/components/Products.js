import {useContext, useState} from "react";
import {CartContext} from "../context/CartContext";

const Products = (props) => {
    const {product} = props;
    const {cart, setCart} = useContext(CartContext);
    const [isAdding, setIsAdding] = useState(false);
    const addToCart = (e, product) => {
        e.preventDefault();
        setIsAdding(true)
        let _cart = {...cart};
        if (!_cart.items) {
            _cart.items = {}
        }

        if (_cart.items[product.id]) {
            _cart.items[product.id] += 1;
        } else {
            _cart.items[product.id] = 1;
        }

        if (!_cart.totalItems) {
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart);
        setTimeout(() => setIsAdding(false), 600)
    }
    return (
        <div className="w-70 relative mx-4">
            {
                isAdding ? <button className="-mt-4 float-right w-12 h-10 rounded-full" style={{
                        background: "url(/images/add-to-cart.svg) no-repeat",
                        cursor: "pointer",
                        border: "none",
                        outline: "none"
                    }}/> :
                    <button className="-mt-4 float-right w-12 h-10 rounded-full" onClick={(e) => {
                        addToCart(e, product)
                    }}
                            style={{
                                background: "url(/images/add.svg) no-repeat",
                                cursor: "pointer",
                                border: "none",
                                outline: "none"
                            }}/>
            }

            <div className="bg-white py-4 px-4 border-4 border-gray-100 rounded-3xl h-full shadow-2xl">
                <img src={product.image} alt="pizza icon"
                     className="w-40 h-40 ml-10"/>

                <div className="flex justify-between">
                    <div className="py-4 flex space-x-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                        </svg>
                        <p className="text-sm font-semibold">{product.name}</p>
                    </div>
                    <div className="py-4 pr-5">
                        <p className="text-sm font-semibold">{product.foodType}</p>
                    </div>
                </div>
                <div className="text-sm">
                    <span>{product.desc}</span>
                </div>
                <div className="py-4 pr-5 font-semibold">
                    <span>₹ {product.price}</span>
                </div>
            </div>
        </div>
    )
}

export default Products