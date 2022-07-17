function addToCart(e: Event) {
    const element = e.target as HTMLElement;
    const cart = document.querySelector('.cart') as HTMLElement;
    if (element.classList.contains('cart-button')) {
        const cartIdStorage =
            localStorage.getItem('cart') !== null
                ? (JSON.parse(localStorage.getItem('cart') as string) as string[])
                : [];
        const parentId = element.parentElement?.id as string;
        if (!cartIdStorage.includes(parentId)) {
            cartIdStorage.push(parentId);
        } else {
            cartIdStorage.splice(cartIdStorage.indexOf(element.id), 1);
        }
        element.classList.toggle('in-cart');
        localStorage.setItem('cart', JSON.stringify(cartIdStorage));
        cart.innerHTML = cartIdStorage.length.toString();
    }
}

export default addToCart;
