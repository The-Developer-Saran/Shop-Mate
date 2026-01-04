const API_URL = 'https://infocare-dev.infocare.dev/api/interview-demo';

export const fetchProductsFromApi = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const json = await response.json();
    if (!json?.success) {
        throw new Error(json?.message || 'API returned unsuccessful response');
    }
    return json.data.products || [];
};

export class Product {
    constructor({ id, product_name, amount, image }) {
        this.id = id;
        this.name = product_name;
        this.price = amount;
        this.image = image;
    }
}