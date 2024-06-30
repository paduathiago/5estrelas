import { Review } from "@/backTypes";

export const establishment = {
  id: "12",
  name: "Mocked Establishment",
  address: "123 Mock St.",
  category: "Restaurant",
  description: "A great place to eat!",
  rating: 4.5,
};

export const establishments = [
  {
    id: "1",
    name: "The Fancy Fork",
    address: "456 Gourmet Ave.",
    category: "Restaurant",
    description: "A luxurious dining experience.",
    rating: 4.7,
  },
  {
    id: "2",
    name: "Book Haven",
    address: "789 Reading Ln.",
    category: "Bookstore",
    description: "A paradise for book lovers.",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Tech Hub",
    address: "101 Innovation Blvd.",
    category: "Electronics",
    description: "The latest and greatest in tech.",
    rating: 4.6,
  },
  {
    id: "4",
    name: "Health First",
    address: "202 Wellness Dr.",
    category: "Pharmacy",
    description: "Your health is our priority.",
    rating: 4.4,
  },
  {
    id: "5",
    name: "Fashion Fiesta",
    address: "303 Style St.",
    category: "Clothing Store",
    description: "Trendy fashion for everyone.",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Quick Fix",
    address: "404 Repair Rd.",
    category: "Auto Repair",
    description: "Reliable car repair services.",
    rating: 4.3,
  },
  {
    id: "7",
    name: "Pet Paradise",
    address: "505 Paws Blvd.",
    category: "Pet Store",
    description: "Everything your pet needs.",
    rating: 4.7,
  },
  {
    id: "8",
    name: "Fresh Finds",
    address: "606 Market St.",
    category: "Grocery Store",
    description: "Fresh produce and groceries.",
    rating: 4.6,
  },
  {
    id: "9",
    name: "Gym Heroes",
    address: "707 Fitness Ave.",
    category: "Gym",
    description: "Where fitness meets fun.",
    rating: 4.8,
  },
  {
    id: "10",
    name: "Cafe Cozy",
    address: "808 Coffee Ln.",
    category: "Cafe",
    description: "A cozy place for coffee lovers.",
    rating: 4.5,
  },
  {
    id: "11",
    name: "Sparkling Clean",
    address: "909 Shine St.",
    category: "Laundry",
    description: "Spotless cleaning services.",
    rating: 4.4,
  },
  {
    id: "12",
    name: "Toy Treasure",
    address: "1010 Fun Ave.",
    category: "Toy Store",
    description: "Toys for all ages.",
    rating: 4.7,
  },
  {
    id: "13",
    name: "Travel Bliss",
    address: "1111 Holiday Blvd.",
    category: "Travel Agency",
    description: "Your dream vacation starts here.",
    rating: 4.5,
  },
  {
    id: "14",
    name: "Garden Delights",
    address: "1212 Green Ln.",
    category: "Garden Center",
    description: "All your gardening needs.",
    rating: 4.6,
  },
  {
    id: "15",
    name: "Music Mania",
    address: "1313 Melody St.",
    category: "Music Store",
    description: "Instruments and accessories.",
    rating: 4.7,
  },
  {
    id: "16",
    name: "Elegant Events",
    address: "1414 Party Ave.",
    category: "Event Planning",
    description: "Making your events unforgettable.",
    rating: 4.8,
  },
  {
    id: "17",
    name: "Bright Smiles",
    address: "1515 Dental St.",
    category: "Dental Clinic",
    description: "Quality dental care.",
    rating: 4.5,
  },
  {
    id: "18",
    name: "Artistic Expressions",
    address: "1616 Creativity Ln.",
    category: "Art Gallery",
    description: "A showcase of local art.",
    rating: 4.6,
  },
  {
    id: "19",
    name: "Fit Feet",
    address: "1717 Comfort Blvd.",
    category: "Shoe Store",
    description: "Comfortable and stylish shoes.",
    rating: 4.4,
  },
  {
    id: "20",
    name: "Home Harmony",
    address: "1818 Decor St.",
    category: "Home Decor",
    description: "Beautiful decor for your home.",
    rating: 4.7,
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    userId: 'user1',
    establishmentId: 'est1',
    userImage: 'https://example.com/images/user1.jpg',
    userName: 'João Silva',
    rating: 5,
    comment: 'Excelente atendimento e comida deliciosa!',
    establishmentComment: 'Obrigado pelo feedback positivo, João!',
    timestamp: new Date('2024-06-25T12:00:00Z'),
    likes: 10,
    dislikes: 1,
    currentUserFeedback: 'LIKE'
  },
  {
    id: '2',
    userId: 'user2',
    establishmentId: 'est2',
    userImage: 'https://example.com/images/user2.jpg',
    userName: 'Maria Oliveira',
    rating: 4,
    comment: 'Lugar agradável, mas poderia melhorar o tempo de espera.',
    establishmentComment: 'Agradecemos o feedback, Maria. Estamos trabalhando para melhorar.',
    timestamp: new Date('2024-06-26T14:30:00Z'),
    likes: 8,
    dislikes: 2,
    currentUserFeedback: 'LIKE'
  },
  {
    id: '3',
    userId: 'user3',
    establishmentId: 'est1',
    userImage: 'https://example.com/images/user3.jpg',
    userName: 'Carlos Pereira',
    rating: 3,
    comment: 'Comida boa, mas o atendimento deixou a desejar.',
    establishmentComment: 'Lamentamos pela experiência, Carlos. Vamos revisar nossos processos.',
    timestamp: new Date('2024-06-27T16:45:00Z'),
    likes: 5,
    dislikes: 3,
    currentUserFeedback: 'DISLIKE'
  },
  {
    id: '4',
    userId: 'user4',
    establishmentId: 'est3',
    userImage: 'https://example.com/images/user4.jpg',
    userName: 'Ana Costa',
    rating: 5,
    comment: 'Ambiente maravilhoso e ótimo custo-benefício.',
    establishmentComment: 'Ficamos felizes que tenha gostado, Ana!',
    timestamp: new Date('2024-06-28T18:00:00Z'),
    likes: 12,
    dislikes: 0,
    currentUserFeedback: 'LIKE'
  },
  {
    id: '5',
    userId: 'user5',
    establishmentId: 'est2',
    userImage: 'https://example.com/images/user5.jpg',
    userName: 'Pedro Souza',
    rating: 2,
    comment: 'Infelizmente, não gostei da comida. Estava fria.',
    establishmentComment: 'Pedimos desculpas, Pedro. Vamos verificar o ocorrido.',
    timestamp: new Date('2024-06-29T20:15:00Z'),
    likes: 3,
    dislikes: 5,
    currentUserFeedback: 'DISLIKE'
  },
  {
    id: '6',
    userId: 'user6',
    establishmentId: 'est3',
    userImage: 'https://example.com/images/user6.jpg',
    userName: 'Fernanda Lima',
    rating: 4,
    comment: 'Boa experiência, mas poderia ter mais opções no cardápio.',
    establishmentComment: 'Agradecemos o feedback, Fernanda. Estamos adicionando novas opções.',
    timestamp: new Date('2024-06-30T22:30:00Z'),
    likes: 7,
    dislikes: 1,
    currentUserFeedback: 'LIKE'
  }
];