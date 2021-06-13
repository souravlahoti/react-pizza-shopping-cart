export const getCart = () => {
    return  window.localStorage.getItem('cart');
}

export const storeCart = (cart) => {
        window.localStorage.setItem('cart', JSON.stringify(cart));
}