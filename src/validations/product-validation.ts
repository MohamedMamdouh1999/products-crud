export const productValidation = (product: { title: string, description: string, imageURL: string, price: string, colors: string[] }) => {
    const errors = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
        colors: ""
    };

    const validURL = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i.test(product.imageURL);

    if (!product.title.trim() || product.title.length < 3 || product.title.length > 50) {
        errors.title = "Title must be between 3 and 50 characters";
    }
    if (!product.description.trim() || product.description.length < 3 || product.description.length > 500) {
        errors.description = "Description must be between 3 and 500 characters";
    }
    if (!product.imageURL.trim() || !validURL) {
        errors.imageURL = "Image URL is invalid";
    }
    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Price is invalid";
    }
    if (product.colors.length < 1) {
        errors.colors = "At least one color is required";
    }

    return errors;
};