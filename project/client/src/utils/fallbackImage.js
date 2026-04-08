
export const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg width='300' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='300' height='200' fill='%23f8f9fa'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='18' fill='%239ca3af' text-anchor='middle' dy='.3em'%3ENo Image Available%3C/text%3E%3C/svg%3E";


export const getImageSrc = (product) => {
  if (product?.imageData) return product.imageData;
  if (product?.image) return product.image;
  if (product?.imageUrl) return product.imageUrl;
  return FALLBACK_IMAGE;
};


export const handleImageError = (e) => {
  e.target.src = FALLBACK_IMAGE;
  e.target.onerror = null; 
};
