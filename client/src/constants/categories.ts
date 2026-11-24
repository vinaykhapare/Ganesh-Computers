export const CATEGORIES_LIST = [
  'All Categories',
  'Computer & Laptops',
  'Second Computers & Laptops',
  'Computer Peripherals',
  'Cartridge & Tonner Refilling',
  'Printer, Scanner, UPS, Invertors & Batteries',
  'CCTV Cameras',
  'Repairs & Services',
] as const;

export type CategoryName = typeof CATEGORIES_LIST[number];
