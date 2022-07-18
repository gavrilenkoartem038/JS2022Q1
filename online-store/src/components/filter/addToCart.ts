function addToCart(e: Event) {
    const element = e.target as HTMLElement;
    const cart = document.querySelector('.cart') as HTMLElement;
    if (element.classList.contains('cart-button')) {
        const cartIdStorage =
            localStorage.getItem('cart') !== null
                ? (JSON.parse(localStorage.getItem('cart') as string) as string[])
                : [];
        const parentId = element.parentElement?.id as string;
        const maxCartLength = 20;
        if (!cartIdStorage.includes(parentId) && cartIdStorage.length < maxCartLength) {
            cartIdStorage.push(parentId);
            (element.parentElement as HTMLElement).classList.add('in-cart');
            element.innerHTML = 'In cart';
            element.classList.add('in-cart');
        } else if (cartIdStorage.includes(parentId)) {
            cartIdStorage.splice(cartIdStorage.indexOf(element.id), 1);
            (element.parentElement as HTMLElement).classList.remove('in-cart');
            element.innerHTML = 'Add to cart';
            element.classList.remove('in-cart');
        } else {
            alert('Too much cars in you cart');
        }
        localStorage.setItem('cart', JSON.stringify(cartIdStorage));
        cart.innerHTML = cartIdStorage.length.toString();
    }
}

export default addToCart;
