import {CartContext} from "../context/CartContext";
import {useContext, useEffect, useState} from "react";

const Cart = () => {
    const {cart, setCart} = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    let total = 0;
    useEffect(() => {
        if (!cart.items) {
            return;
        }

        if (dataFetched)
            return;

        let productIds = [];
        let data = require('../assets/db.json').products;
        if (Object.keys(cart).length !== 0) {
            productIds = Object.keys(cart.items)
            console.log(productIds);
            // eslint-disable-next-line array-callback-return
            data.map(p => {
                    let id = (p.id).toString();
                    if (productIds.includes(id)) {
                        products.push(p);
                        console.log("products", products);
                    }
                }
            );
            setProducts(products);
            setDataFetched(true);
        }
    }, [cart]);

    const getSum = (id, price) => {
        const existingQty = cart.items[id];
        total += existingQty * price
        return existingQty * price;
    }

    const getQty = (id) => {
        return cart.items[id];

    }

    const increment = (id) => {
        const existingQty = cart.items[id];
        let _cart = {...cart};
        _cart.items[id] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const handleDelete = (id) => {
        const existingQty = cart.items[id];
        let _cart = {...cart};
        delete _cart.items[id];
        _cart.totalItems -= existingQty;
        setCart(_cart);
        let updatedProductsList = products.filter((product) => product.id !== id);
        setProducts(updatedProductsList);
    }

    const decrement = (id) => {
        const existingQty = cart.items[id];
        console.log(existingQty);
        let _cart = {...cart};
        if (existingQty === 1) {
            delete _cart.items[id];
            _cart.totalItems -= 1;
            let updatedProductsList = products.filter((product) => product.id !== id);
            setProducts(updatedProductsList);
        } else {
            _cart.items[id] -= 1;
            _cart.totalItems -= 1;
        }
        setCart(_cart);
    }

    const handleOrderNow = () => {
        window.alert('Order placed successfully!');
        setProducts([]);
        setCart({});
    }
    return (
        !products.length ?
            <div>
                <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="Emtry cart"/>
            </div> :
            <div>
                <div className="container mx-auto lg:w-1/2 w-full pb-24">
                    <h1 className="my-12 font-bold">Cart items</h1>
                    <ul>
                        {
                            products.map(product => {
                                return (
                                    <li className="mb-12" key={product.id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img className="h-16 rounded-full" src={product.image} alt=""/>
                                                <span className="font-bold ml-4 w-48">{product.name}</span>
                                            </div>
                                            <div>
                                                <button onClick={() => {
                                                    decrement(product.id)
                                                }}
                                                        className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none">-
                                                </button>
                                                <b className="px-4">{getQty(product.id)}</b>
                                                <button onClick={() => {
                                                    increment(product.id)
                                                }}
                                                        className="bg-yellow-500 px-4 py-2 rounded-full leading-none focus:outline-none">+
                                                </button>
                                            </div>
                                            <span>₹ {getSum(product.id, product.price)}</span>
                                            <button onClick={() => {
                                                handleDelete(product.id)
                                            }} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <hr className="my-6"/>
                    <div className="text-right">
                        <b>Grand Total:</b> ₹ {total}
                    </div>
                    <div className="text-right mt-6">
                        <button onClick={handleOrderNow}
                                className="font-semibold bg-yellow-500 py-2 px-4 rounded inline-flex items-center"><svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"
                                                                                                   viewBox="0 0 20 20">
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                        </svg>
                            <span>Place Order</span>
                        </button>
                    </div>
                </div>

            </div>
    )
}

export default Cart