
export const sanitizeProductForCart = (product) => {
  return {
    _id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    stock: product.stock,
  
    imageUrl: product.imageUrl || null,
 
    qty: product.qty || 1
  };
};


export const cleanCartItems = (cartItems) => {
  return cartItems.map(item => sanitizeProductForCart(item));
};


export const getCartItemImage = (cartItem, products = []) => {

  const product = products.find(p => p._id === cartItem._id);
  
  if (product?.imageData) return product.imageData;
  if (product?.image) return product.image;
  if (cartItem?.imageUrl) return cartItem.imageUrl;
  
 
  return null;
};
