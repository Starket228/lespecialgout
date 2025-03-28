
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  region?: string;
}

export const foodItems: FoodItem[] = [
  {
    id: "f1",
    name: "Poulet Yassa",
    description: "Poulet mariné avec oignons et citron",
    price: "8500 FCFA",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80",
    category: "Pour vous"
  },
  {
    id: "f2",
    name: "Mafé",
    description: "Ragoût de bœuf à la sauce d'arachide",
    price: "9500 FCFA",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Pour vous"
  },
  {
    id: "f3",
    name: "Thiéboudienne",
    description: "Riz au poisson et légumes",
    price: "9200 FCFA",
    image: "https://images.unsplash.com/photo-1567982047351-76b6f93e38ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Pour vous"
  },
  {
    id: "f4",
    name: "Attieke Poisson",
    description: "Semoule de manioc avec poisson grillé",
    price: "10200 FCFA",
    image: "https://images.unsplash.com/photo-1580217593608-61931cefc821?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Pour vous"
  },
  {
    id: "f5",
    name: "Aloko",
    description: "Bananes plantains frites",
    price: "5200 FCFA",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80",
    category: "Pour vous"
  },
  {
    id: "f6",
    name: "Ndolé",
    description: "Plat camerounais à base de feuilles amères et de viande",
    price: "8800 FCFA",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Pour vous"
  },
  {
    id: "f7",
    name: "Alloco Poulet",
    description: "Bananes plantains frites servies avec du poulet grillé",
    price: "7500 FCFA",
    image: "https://images.unsplash.com/photo-1598511796432-32663d0875bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Pour vous"
  },
  {
    id: "f8",
    name: "Fufu et Sauce Gombo",
    description: "Pâte de manioc accompagnée d'une sauce gluante aux gombos",
    price: "6800 FCFA",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "Pour vous"
  },
  
  // Petit Déjeuner
  {
    id: "pd1",
    name: "Croissant au beurre",
    description: "Croissant feuilleté et croustillant",
    price: "800 FCFA",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
    category: "Petit Dej"
  },
  {
    id: "pd2",
    name: "Omelette au fromage",
    description: "Omelette moelleuse au fromage fondu",
    price: "1500 FCFA",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80",
    category: "Petit Dej"
  },
  
  // Africains
  {
    id: "af1",
    name: "Jollof Rice",
    description: "Riz épicé cuit dans une sauce tomate",
    price: "7200 FCFA",
    image: "https://grandbaby-cakes.com/wp-content/uploads/2023/04/jollof-rice-recipe-23.jpg",
    category: "Africains"
  },
  {
    id: "af2",
    name: "Mafé",
    description: "Ragoût de bœuf à la sauce d'arachide",
    price: "9500 FCFA",
    image: "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "Africains"
  },
  
  // Européens
  {
    id: "eu1",
    name: "Ratatouille",
    description: "Plat de légumes provençal",
    price: "8500 FCFA",
    image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Européens"
  },
  {
    id: "eu2",
    name: "Steak Frites",
    description: "Steak grillé servi avec des frites",
    price: "12000 FCFA",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Européens"
  },
  
  // Fast Food
  {
    id: "ff1",
    name: "Hamburger",
    description: "Burger de bœuf avec fromage et légumes",
    price: "5500 FCFA",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1299&q=80",
    category: "Fast Food"
  },
  {
    id: "ff2",
    name: "Pizza Margherita",
    description: "Pizza classique avec tomate et mozzarella",
    price: "7000 FCFA",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    category: "Fast Food"
  },
  
  // Glacerie
  {
    id: "gl1",
    name: "Sundae au chocolat",
    description: "Glace vanille avec sauce au chocolat",
    price: "3500 FCFA",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=327&q=80",
    category: "Glacerie"
  },
  {
    id: "gl2",
    name: "Sorbet aux fruits",
    description: "Assortiment de sorbets aux fruits frais",
    price: "4000 FCFA",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "Glacerie"
  },
  
  // Pizzeria
  {
    id: "pz1",
    name: "Pizza Quatre Fromages",
    description: "Pizza avec mélange de quatre fromages",
    price: "8500 FCFA",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Pizzeria"
  },
  {
    id: "pz2",
    name: "Calzone",
    description: "Pizza pliée farcie de viande et fromage",
    price: "7500 FCFA",
    image: "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    category: "Pizzeria"
  },
  
  // Boissons
  {
    id: "dr1",
    name: "Smoothie aux fruits",
    description: "Mélange rafraîchissant de fruits frais",
    price: "3000 FCFA",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1416&q=80",
    category: "Boissons"
  },
  {
    id: "dr2",
    name: "Café Latte",
    description: "Espresso avec du lait mousseux",
    price: "2500 FCFA",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1337&q=80",
    category: "Boissons"
  }
];

export const courseItems: FoodItem[] = [
  {
    id: "c1",
    name: "Tomates",
    description: "Tomates fraîches",
    price: "3000 FCFA/kg",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "Fruits & Légumes"
  },
  {
    id: "c2",
    name: "Lait",
    description: "Lait frais",
    price: "2500 FCFA/L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Produits Laitiers"
  },
  {
    id: "c3",
    name: "Riz basmati",
    description: "Riz basmati premium",
    price: "5000 FCFA/kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "Épicerie"
  },
  {
    id: "c4",
    name: "Jus d'orange",
    description: "Jus d'orange pressé",
    price: "3500 FCFA/L",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    category: "Boissons"
  }
];

export const togoleseSpecialties: FoodItem[] = [
  {
    id: "tg1",
    name: "Akpan",
    description: "Pâte de maïs fermentée servie avec une sauce épicée",
    price: "5500 FCFA",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "togolese",
    region: "Maritime"
  },
  {
    id: "tg2",
    name: "Fufu",
    description: "Pâte de manioc servie avec une sauce aux légumes",
    price: "6000 FCFA",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    category: "togolese",
    region: "Plateaux"
  },
  {
    id: "tg3",
    name: "Gboma Dessi",
    description: "Ragoût d'épinards avec viande ou poisson",
    price: "7000 FCFA",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "togolese",
    region: "Centrale"
  },
  {
    id: "tg4",
    name: "Koklo Mémé",
    description: "Poulet grillé mariné aux épices togolaises",
    price: "8500 FCFA",
    image: "https://images.unsplash.com/photo-1598511796432-32663d0875bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    category: "togolese",
    region: "Kara"
  },
];

export const bannerImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
];

export const categories = [
  "Pour vous",
  "Petit Dej",
  "Africains",
  "Européens",
  "Fast Food",
  "Glacerie", 
  "Pizzeria",
  "Boissons"
];

export const courseCategories = [
  "Tous",
  "Épicerie",
  "Fruits & Légumes",
  "Produits Laitiers",
  "Boissons",
  "Snacks"
];
