export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
  tag: string;
  rating: number;
  reviews: number;
  description: string;
}

export const products: Product[] = [
  {
    id: 'sahara',
    name: 'Ensemble Sahara',
    price: 39,
    originalPrice: 59,
    image: 'https://images.pexels.com/photos/36168986/pexels-photo-36168986.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600',
    colors: ['#C9A96E', '#8B6F47', '#E8D5B7'],
    tag: 'Best-Seller',
    rating: 4.9,
    reviews: 234,
    description: 'Hijab & sous-hijab en tons dorés, tissu respirant premium.',
  },
  {
    id: 'perle',
    name: 'Ensemble Perle',
    price: 45,
    originalPrice: 69,
    image: 'https://images.pexels.com/photos/27014970/pexels-photo-27014970.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600',
    colors: ['#F5F0EB', '#D4C5B2', '#A89B8C'],
    tag: 'Nouveau',
    rating: 4.8,
    reviews: 189,
    description: 'Nuances neutres élégantes pour un look raffiné au quotidien.',
  },
  {
    id: 'nuit',
    name: 'Ensemble Nuit',
    price: 49,
    originalPrice: 75,
    image: 'https://images.pexels.com/photos/12055314/pexels-photo-12055314.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600',
    colors: ['#1A1614', '#2D2825', '#4A4340'],
    tag: 'Exclusif',
    rating: 5.0,
    reviews: 156,
    description: 'Tons profonds et sophistiqués pour les grandes occasions.',
  },
  {
    id: 'aurore',
    name: 'Ensemble Aurore',
    price: 42,
    originalPrice: 65,
    image: 'https://images.pexels.com/photos/10634555/pexels-photo-10634555.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=600',
    colors: ['#F4B5C1', '#E8899A', '#D4617A'],
    tag: 'Tendance',
    rating: 4.9,
    reviews: 312,
    description: 'Rosé délicat qui illumine votre teint avec douceur.',
  },
];

export const featuredProduct = products[0];
