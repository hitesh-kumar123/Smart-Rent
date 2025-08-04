const dummyProperties = [
  // Apartment category (2 properties)
  {
    _id: "1",
    title: "Modern Apartment in Downtown",
    description:
      "Beautiful apartment with stunning views of the city. Newly renovated with modern amenities and close to public transportation.",
    price: 150,
    propertyType: "Apartment",
    category: "Apartment",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 85,
    rating: 4.92,
    trending: true,
    location: {
      city: "New York",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    images: [
      "https://unsplash.com/photos/white-concrete-building-during-daytime-gxyeia7Syuk",
      "https://unsplash.com/photos/white-concrete-building-during-daytime-gxyeia7Syuk",
      "https://unsplash.com/photos/white-concrete-building-during-daytime-gxyeia7Syuk",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "2",
    title: "Stylish Downtown Loft",
    description:
      "Industrial chic loft with high ceilings and exposed brick. Perfect for urban professionals looking for style and convenience.",
    price: 220,
    propertyType: "Apartment",
    category: "Apartment",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 75,
    rating: 4.75,
    location: {
      city: "Chicago",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9mdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // House category (2 properties)
  {
    _id: "3",
    title: "Cozy Family Home",
    description:
      "Spacious family home in a quiet neighborhood. Perfect for families with children, featuring a large backyard and modern amenities.",
    price: 220,
    propertyType: "House",
    category: "House",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.78,
    location: {
      city: "Portland",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
      parking: true,
    },
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "4",
    title: "Modern Suburban House",
    description:
      "Contemporary design with open floor plan. Featuring a chef's kitchen, smart home technology, and spacious master suite.",
    price: 250,
    propertyType: "House",
    category: "House",
    capacity: {
      bedrooms: 4,
      bathrooms: 3,
    },
    size: 200,
    rating: 4.85,
    location: {
      city: "Austin",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      ac: true,
      washer: true,
      dryer: true,
    },
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Villa category (2 properties)
  {
    _id: "5",
    title: "Luxury Beachfront Villa",
    description:
      "Luxurious villa with direct access to the beach. Perfect for family vacations with spacious living areas and private swimming pool.",
    price: 350,
    propertyType: "Villa",
    category: "Villa",
    capacity: {
      bedrooms: 4,
      bathrooms: 3,
    },
    size: 220,
    rating: 4.85,
    trending: true,
    location: {
      city: "Miami",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
    },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "6",
    title: "Mediterranean Villa Retreat",
    description:
      "Elegant villa with Mediterranean architecture. Features include a private pool, outdoor kitchen, and panoramic mountain views.",
    price: 380,
    propertyType: "Villa",
    category: "Villa",
    capacity: {
      bedrooms: 5,
      bathrooms: 4,
    },
    size: 280,
    rating: 4.92,
    location: {
      city: "Scottsdale",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Condo category (2 properties)
  {
    _id: "7",
    title: "Luxury Penthouse Suite",
    description:
      "High-end penthouse with panoramic city views. Features include a hot tub, modern kitchen, and private elevator access.",
    price: 500,
    propertyType: "Condo",
    category: "Condo",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 150,
    rating: 4.96,
    trending: true,
    location: {
      city: "Los Angeles",
      country: "USA",
    },
    amenities: {
      wifi: true,
      hotTub: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVudGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "8",
    title: "Modern Urban Condo",
    description:
      "Sleek city condo with floor-to-ceiling windows and modern furnishings. Walking distance to restaurants and entertainment.",
    price: 275,
    propertyType: "Condo",
    category: "Condo",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 120,
    rating: 4.83,
    location: {
      city: "Seattle",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      gym: true,
      workspace: true,
    },
    images: [
      "https://images.unsplash.com/photo-1551361415-69c87624161d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Cabin category (2 properties)
  {
    _id: "9",
    title: "Mountain Cabin Retreat",
    description:
      "Rustic cabin in the mountains with fireplace and stunning views. Great for hiking, skiing, and outdoor adventures.",
    price: 180,
    propertyType: "Cabin",
    category: "Cabin",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 90,
    rating: 4.82,
    location: {
      city: "Denver",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
      parking: true,
    },
    images: [
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "10",
    title: "Cozy Forest Cabin",
    description:
      "Charming wood cabin surrounded by tall pines. Features a wood-burning stove, rustic decor, and private hiking trails.",
    price: 165,
    propertyType: "Cabin",
    category: "Cabin",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 65,
    rating: 4.79,
    location: {
      city: "Asheville",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
    },
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Beach category (2 properties)
  {
    _id: "11",
    title: "Beachside Bungalow",
    description:
      "Cozy bungalow just steps from the beach. Perfect for a romantic getaway with stunning ocean views.",
    price: 190,
    propertyType: "House",
    category: "Beach",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 60,
    rating: 4.89,
    trending: true,
    location: {
      city: "San Diego",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Beachfront", "Ocean View"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYWNoJTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "12",
    title: "Oceanfront Beach House",
    description:
      "Stunning beach house with direct ocean access and panoramic water views. Large deck for sunbathing and outdoor dining.",
    price: 320,
    propertyType: "House",
    category: "Beach",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 140,
    rating: 4.91,
    location: {
      city: "Malibu",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      parking: true,
    },
    features: ["Beachfront", "Ocean View"],
    images: [
      "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Lakefront category (2 properties)
  {
    _id: "13",
    title: "Lakefront Cottage with Dock",
    description:
      "Peaceful cottage on the lake with private dock and beautiful water views. Perfect for fishing and water activities.",
    price: 210,
    propertyType: "House",
    category: "Lakefront",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 110,
    rating: 4.88,
    location: {
      city: "Lake Tahoe",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Lakefront", "Private Dock"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFrZSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "14",
    title: "Modern Lake House",
    description:
      "Contemporary lake house with floor-to-ceiling windows overlooking the water. Features include a private beach and boat slip.",
    price: 280,
    propertyType: "House",
    category: "Lakefront",
    capacity: {
      bedrooms: 4,
      bathrooms: 3,
    },
    size: 190,
    rating: 4.86,
    location: {
      city: "Lake Geneva",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    features: ["Lakefront", "Private Beach"],
    images: [
      "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFrZSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Amazing Views category (2 properties)
  {
    _id: "15",
    title: "Mountain View Retreat",
    description:
      "Stunning property with panoramic mountain views. Floor-to-ceiling windows showcase nature's beauty from every room.",
    price: 240,
    propertyType: "House",
    category: "Amazing",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 120,
    rating: 4.93,
    trending: true,
    location: {
      city: "Boulder",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Amazing views", "Mountain View"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vdW50YWluJTIwdmlld3xlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "16",
    title: "City Skyline Penthouse",
    description:
      "Luxurious penthouse with breathtaking city skyline views. Watch the sunset transform the cityscape from your private terrace.",
    price: 380,
    propertyType: "Condo",
    category: "Amazing",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 130,
    rating: 4.9,
    location: {
      city: "San Francisco",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      ac: true,
    },
    features: ["Amazing views", "City View"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },

  // Tiny Homes category (2 properties)
  {
    _id: "17",
    title: "Compact Modern Tiny House",
    description:
      "Cleverly designed tiny house with all modern amenities. Perfect example of minimalist living without sacrificing comfort.",
    price: 95,
    propertyType: "Tiny",
    category: "Tiny",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 25,
    rating: 4.84,
    location: {
      city: "Portland",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Tiny homes", "Minimalist"],
    images: [
      "https://images.unsplash.com/photo-1668015642451-a3bb11afb441?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    _id: "18",
    title: "Rustic Tiny Cabin",
    description:
      "Charming tiny cabin with rustic details. Smart space utilization provides all necessities in a cozy, intimate setting.",
    price: 85,
    propertyType: "Tiny",
    category: "Tiny",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 20,
    rating: 4.82,
    location: {
      city: "Asheville",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      petFriendly: true,
    },
    features: ["Tiny homes", "Rustic"],
    images: [
      "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRpbnklMjBob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Mansion category (2 properties)
  {
    _id: "19",
    title: "Luxury Countryside Estate",
    description:
      "Expansive estate in the countryside with private garden, swimming pool, and tennis court. Perfect for large groups.",
    price: 450,
    propertyType: "Mansion",
    category: "Mansion",
    capacity: {
      bedrooms: 5,
      bathrooms: 4,
    },
    size: 300,
    rating: 4.97,
    trending: true,
    location: {
      city: "Nashville",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
      gym: true,
    },
    features: ["Mansion", "Luxury"],
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwZXN0YXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "20",
    title: "Historic Grand Mansion",
    description:
      "Magnificent historic mansion with period details and modern updates. Features include a library, ballroom, and formal gardens.",
    price: 520,
    propertyType: "Mansion",
    category: "Mansion",
    capacity: {
      bedrooms: 6,
      bathrooms: 5,
    },
    size: 350,
    rating: 4.95,
    location: {
      city: "Charleston",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
    },
    features: ["Mansion", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuc2lvbnxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Countryside category (2 properties)
  {
    _id: "21",
    title: "Peaceful Country Farmhouse",
    description:
      "Charming renovated farmhouse surrounded by rolling hills and farmland. Enjoy the peace and quiet of rural living.",
    price: 175,
    propertyType: "House",
    category: "Countryside",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 160,
    rating: 4.87,
    location: {
      city: "Woodstock",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      petFriendly: true,
    },
    features: ["Countryside", "Farm View"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdW50cnlzaWRlJTIwaG9tZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "22",
    title: "Country Cottage with Garden",
    description:
      "Idyllic cottage with beautiful gardens and countryside views. Perfect for a peaceful retreat from city life.",
    price: 150,
    propertyType: "House",
    category: "Countryside",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 90,
    rating: 4.83,
    location: {
      city: "Hudson Valley",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Countryside", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdW50cnklMjBjb3R0YWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Luxury category (2 properties)
  {
    _id: "23",
    title: "Ultra-Luxury Penthouse",
    description:
      "Opulent penthouse with premium finishes and amenities. Featuring private elevator, marble fixtures, and 24-hour concierge service.",
    price: 650,
    propertyType: "Condo",
    category: "Luxury",
    capacity: {
      bedrooms: 3,
      bathrooms: 3,
    },
    size: 220,
    rating: 4.98,
    trending: true,
    location: {
      city: "New York",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      gym: true,
      hotTub: true,
    },
    features: ["Luxury", "Premium"],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGx1eHVyeSUyMGhvbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "24",
    title: "Lavish Beachfront Villa",
    description:
      "Extravagant beachfront property with infinity pool, private beach access, and designer furnishings throughout.",
    price: 780,
    propertyType: "Villa",
    category: "Luxury",
    capacity: {
      bedrooms: 5,
      bathrooms: 5,
    },
    size: 380,
    rating: 4.99,
    location: {
      city: "Palm Beach",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      parking: true,
      ac: true,
      hotTub: true,
      gym: true,
    },
    features: ["Luxury", "Beachfront"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Castles category (2 properties)
  {
    _id: "25",
    title: "Historic Stone Castle",
    description:
      "Authentic medieval castle with modern comforts. Experience living history in this unique accommodation with turrets and ramparts.",
    price: 480,
    propertyType: "Castle",
    category: "Castles",
    capacity: {
      bedrooms: 5,
      bathrooms: 3,
    },
    size: 400,
    rating: 4.9,
    location: {
      city: "Hudson Valley",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Castle", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "26",
    title: "Fairy Tale Castle Suite",
    description:
      "Stay in a real castle with fairy tale charm. This private suite features gothic architecture and period furnishings.",
    price: 350,
    propertyType: "Castle",
    category: "Castles",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 120,
    rating: 4.88,
    location: {
      city: "Tarrytown",
      country: "USA",
    },
    amenities: {
      wifi: true,
      breakfast: true,
      parking: true,
    },
    features: ["Castle", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1583526241256-cb18e8056705?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FzdGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Tropical category (2 properties)
  {
    _id: "27",
    title: "Tropical Island Bungalow",
    description:
      "Exotic bungalow surrounded by lush tropical gardens. Palm trees, exotic flowers, and island breezes create a paradise feel.",
    price: 230,
    propertyType: "House",
    category: "Tropical",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 70,
    rating: 4.86,
    location: {
      city: "Key West",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Tropical", "Garden"],
    images: [
      "https://plus.unsplash.com/premium_photo-1687960116574-782d09070294?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VHJvcGljYWwlMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    _id: "28",
    title: "Tropical Paradise Villa",
    description:
      "Luxurious villa with tropical theme throughout. Featuring an outdoor shower, hammocks, and private pool surrounded by palm trees.",
    price: 320,
    propertyType: "Villa",
    category: "Tropical",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.91,
    location: {
      city: "Maui",
      country: "USA",
    },
    amenities: {
      wifi: true,
      pool: true,
      kitchen: true,
      ac: true,
    },
    features: ["Tropical", "Paradise"],
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJvcGljYWwlMjB2aWxsYXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Historic category (2 properties)
  {
    _id: "29",
    title: "Historic Downtown Hotel Suite",
    description:
      "Elegant hotel suite in a historic building with classic architecture and modern amenities. Located in the historic district.",
    price: 280,
    propertyType: "Hotel",
    category: "Historic",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 65,
    rating: 4.85,
    location: {
      city: "Boston",
      country: "USA",
    },
    amenities: {
      wifi: true,
      breakfast: true,
      ac: true,
      gym: true,
    },
    features: ["Historic", "Central Location"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "30",
    title: "Victorian Heritage Home",
    description:
      "Beautifully preserved Victorian home with period details and antique furnishings. Experience a bygone era with modern comforts.",
    price: 260,
    propertyType: "House",
    category: "Historic",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.89,
    location: {
      city: "San Francisco",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Historic", "Victorian"],
    images: [
      "https://images.unsplash.com/photo-1519424187720-db6d0fc5a833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGlzdG9yaWMlMjBob21lfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Design category (2 properties)
  {
    _id: "31",
    title: "Architect-Designed Modern Home",
    description:
      "Award-winning architectural design with unique features and innovative use of space and light. A true design enthusiast's dream.",
    price: 310,
    propertyType: "House",
    category: "Design",
    capacity: {
      bedrooms: 2,
      bathrooms: 2,
    },
    size: 140,
    rating: 4.94,
    trending: true,
    location: {
      city: "Palm Springs",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
    },
    features: ["Design", "Architectural"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9kZXJuJTIwaG9tZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "32",
    title: "Designer Loft with Art Collection",
    description:
      "Carefully curated designer loft featuring contemporary art pieces. Each detail has been thoughtfully considered for aesthetics and function.",
    price: 290,
    propertyType: "Apartment",
    category: "Design",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 95,
    rating: 4.92,
    location: {
      city: "Chicago",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    features: ["Design", "Artistic"],
    images: [
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzaWduZXIlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Farm category (2 properties)
  {
    _id: "33",
    title: "Working Farm Stay",
    description:
      "Authentic farm experience with comfortable accommodations. Guests can participate in farm activities and enjoy fresh produce.",
    price: 140,
    propertyType: "Farm",
    category: "Farm",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 120,
    rating: 4.87,
    location: {
      city: "Vermont",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      petFriendly: true,
    },
    features: ["Farm", "Rural"],
    images: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "34",
    title: "Restored Farmhouse Retreat",
    description:
      "Beautifully restored historic farmhouse on working land. Features original details with modern updates for comfort.",
    price: 190,
    propertyType: "Farm",
    category: "Farm",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 170,
    rating: 4.91,
    location: {
      city: "Upstate New York",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      petFriendly: true,
    },
    features: ["Farm", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1593604572579-d7de1e19f094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Treehouse category (2 properties)
  {
    _id: "35",
    title: "Luxury Treehouse Escape",
    description:
      "Elevated treehouse with luxury amenities. Experience the magic of sleeping among the trees with all modern comforts.",
    price: 230,
    propertyType: "Treehouse",
    category: "Treehouse",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 55,
    rating: 4.95,
    trending: true,
    location: {
      city: "Oregon",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      hotTub: true,
    },
    features: ["Treehouse", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJlZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "36",
    title: "Rustic Forest Treehouse",
    description:
      "Charming treehouse built around living trees. Fall asleep to the sounds of nature in this unique forest accommodation.",
    price: 170,
    propertyType: "Treehouse",
    category: "Treehouse",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 40,
    rating: 4.89,
    location: {
      city: "Washington",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Treehouse", "Forest"],
    images: [
      "https://images.unsplash.com/photo-1578645806969-e755c0d43dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlZWhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Trending category (2 properties marked as trending but different property types)
  {
    _id: "37",
    title: "Trending Designer Loft",
    description:
      "This season's most popular rental, featuring Instagram-worthy decor and premium location close to hotspots.",
    price: 270,
    propertyType: "Apartment",
    category: "Trending",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 95,
    rating: 4.96,
    trending: true,
    location: {
      city: "Brooklyn",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
      workspace: true,
    },
    features: ["Trending", "Designer"],
    images: [
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "38",
    title: "Trending Coastal Home",
    description:
      "One of the highest-rated properties in the area, featuring breathtaking ocean views and designer interiors.",
    price: 340,
    propertyType: "House",
    category: "Trending",
    capacity: {
      bedrooms: 3,
      bathrooms: 2,
    },
    size: 180,
    rating: 4.97,
    trending: true,
    location: {
      city: "Santa Barbara",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
      pool: true,
    },
    features: ["Trending", "Coastal"],
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvYXN0YWwlMjBob21lfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },

  // Special unique categories (Boat, Container, Dome, Windmill, Cave, Camping)
  {
    _id: "39",
    title: "Luxury Houseboat",
    description:
      "Experience life on the water in this stationary houseboat. Gentle rocking and water views create a unique stay.",
    price: 195,
    propertyType: "Boat",
    category: "Boat",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 70,
    rating: 4.84,
    location: {
      city: "Seattle",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Boat", "Waterfront"],
    images: [
      "https://images.unsplash.com/photo-1610501671344-ec9f347221b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2Vib2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "40",
    title: "Modern Container Home",
    description:
      "Innovative shipping container conversion with sleek, minimalist design. Proves sustainable living can be stylish and comfortable.",
    price: 125,
    propertyType: "Container",
    category: "Container",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 40,
    rating: 4.82,
    location: {
      city: "Portland",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Container", "Modern"],
    images: [
      "https://images.unsplash.com/photo-1482236416769-543abffc1c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFpbmVyJTIwaG9tZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "41",
    title: "Geodesic Dome Retreat",
    description:
      "Unique geodesic dome home with panoramic windows. The special architecture creates an open, airy feeling with great acoustics.",
    price: 160,
    propertyType: "Dome",
    category: "Dome",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 65,
    rating: 4.85,
    location: {
      city: "Joshua Tree",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
    },
    features: ["Dome", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1518623380242-d992d3c57b37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9tZSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "42",
    title: "Converted Historic Windmill",
    description:
      "Stay in a beautifully converted windmill with original features and 360-degree views from the top floor bedroom.",
    price: 220,
    propertyType: "Windmill",
    category: "Windmill",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 90,
    rating: 4.93,
    location: {
      city: "Cape Cod",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      parking: true,
    },
    features: ["Windmill", "Historic"],
    images: [
      "https://images.unsplash.com/photo-1576007473554-a5fa517bc754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2luZG1pbGwlMjBob3VzZXxlbnwwfHwwfHx8MA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
  {
    _id: "43",
    title: "Modern Desert Cave House",
    description:
      "Unique cave dwelling built into a hillside with natural temperature regulation. A perfect blend of primal and modern living.",
    price: 185,
    propertyType: "Cave",
    category: "Cave",
    capacity: {
      bedrooms: 2,
      bathrooms: 1,
    },
    size: 85,
    rating: 4.88,
    location: {
      city: "Sedona",
      country: "USA",
    },
    amenities: {
      wifi: true,
      kitchen: true,
      ac: true,
    },
    features: ["Cave", "Unique"],
    images: [
      "https://images.unsplash.com/photo-1717161282488-528e26aa307b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fE1vZGVybiUyMERlc2VydCUyMENhdmUlMjBIb3VzZXxlbnwwfHwwfHx8MA%3D%3D",
    ],
  },

  // update
  {
    _id: "44",
    title: "Luxury Glamping Tent",
    description:
      "Experience the outdoors without roughing it. This luxury tent features a real bed, electricity, and upscale amenities in a natural setting.",
    price: 145,
    propertyType: "Camping",
    category: "Camping",
    capacity: {
      bedrooms: 1,
      bathrooms: 1,
    },
    size: 40,
    rating: 4.86,
    location: {
      city: "Big Sur",
      country: "USA",
    },
    amenities: {
      wifi: true,
      parking: true,
      breakfast: true,
    },
    features: ["Camping", "Glamping"],
    images: [
      "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    ],
  },
];