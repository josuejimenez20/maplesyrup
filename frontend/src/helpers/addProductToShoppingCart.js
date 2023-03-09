

export function addProductToShoppingCart(id_product, title, price, image_path, dataShopping) {

    console.log(id_product, title, price, image_path);

    const objectData = {
        id_product,
        title,
        price,
        image_path,
        count: 1
    }

    // Get data from localstorage
    // It's most an array 
    const array = dataShopping;

    // Add the product join data localstorage
    array.push(objectData);

    // Add data to localstorage
    localStorage.setItem("shopping_cart", JSON.stringify(array));
}