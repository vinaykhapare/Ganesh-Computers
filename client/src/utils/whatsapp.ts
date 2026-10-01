import { formatPrice } from './formatters';

export const STORE_OWNER = 'Mr. G.T. Patil';
export const DEFAULT_STORE_PHONE = '919373873513';
export const STORE_DISPLAY_PHONE = '+91 93738 73513';
export const STORE_EMAIL = 'ganesh.gcg@gmail.com';
export const STORE_ADDRESS = 'Subhash Road, Gadhinglaj, Dist. Kolhapur, 416502';
export const STORE_HOURS = 'Open Daily: 10:30 AM – 7:30 PM (Closed on Tuesdays)';

export const STORE_SERVICES = [
  'Computer & Laptops (Brand New & Assembled)',
  'Second Computers & Laptops (Certified Pre-Owned)',
  'Computer Peripherals & Accessories',
  'Cartridge & Toner Refilling',
  'Printer, Scanner, UPS, Inverters & Batteries',
  'CCTV Security Cameras & Surveillance',
  'Repairs of Computers, Laptops, Printers, Motherboards & Monitors',
];

/**
 * Returns clean phone number without spaces or special characters for wa.me URL
 */
export function getCleanPhone(phone?: string): string {
  const target = phone || import.meta.env.VITE_WHATSAPP_PHONE || DEFAULT_STORE_PHONE;
  const digitsOnly = target.replace(/[^\d]/g, '');
  // If user entered 10-digit Indian number without country code, prefix with 91
  if (digitsOnly.length === 10) {
    return `91${digitsOnly}`;
  }
  return digitsOnly;
}

/**
 * Generates an inquiry WhatsApp link for a specific product
 */
export function generateProductInquiryUrl(product: {
  name: string;
  slug: string;
  price: number;
  category?: string;
}): string {
  const phone = getCleanPhone();
  const priceFormatted = formatPrice(product.price);
  
  const message = `Hello Mr. G.T. Patil (Ganesh Computers, Gadhinglaj),

I am inquiring about this item from your catalog:
• Product: *${product.name}*
• Category: ${product.category || 'Hardware'}
• Listed Price: *${priceFormatted}*
• Ref: ${product.slug}

Please confirm current store availability and best offer.
Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates a general WhatsApp inquiry link
 */
export function generateGeneralInquiryUrl(subject?: string): string {
  const phone = getCleanPhone();
  const message = subject 
    ? `Hello Mr. G.T. Patil (Ganesh Computers, Gadhinglaj),\nI would like to inquire about: ${subject}`
    : `Hello Mr. G.T. Patil (Ganesh Computers, Gadhinglaj),\nI am looking for computers, laptop repairs, second-hand systems, or printer/CCTV services.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
