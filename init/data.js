const sampleListing = [
  {
    title: "Cozy Mountain Cabin",
    description: "A peaceful cabin surrounded by beautiful mountains.",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    price: 1200,
    location: "Manali",
    country: "India"
  },
  {
    title: "Beachside Villa",
    description: "A luxurious villa with a beautiful view of the beach.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    price: 2500,
    location: "Goa",
    country: "India"
  },
  {
    title: "Modern City Apartment",
    description: "A stylish apartment located in the heart of the city.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    price: 1800,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Lake View Cottage",
    description: "A relaxing cottage overlooking a beautiful lake.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    price: 1500,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Forest Retreat",
    description: "A quiet retreat surrounded by lush green forests.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b",
    price: 1000,
    location: "Dehradun",
    country: "India"
  },
  {
    title: "Luxury Desert Camp",
    description: "Experience a luxurious stay in the middle of the desert.",
    image: "https://images.unsplash.com/photo-1668342081577-9c568eb1d550?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: 2200,
    location: "Jaisalmer",
    country: "India"
  },
  {
    title: "Royal Palace Stay",
    description: "Stay in a beautiful heritage property with royal architecture.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    price: 3500,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Hilltop Homestay",
    description: "A charming homestay with stunning views of the hills.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    price: 1300,
    location: "Shimla",
    country: "India"
  },
  {
    title: "Riverside House",
    description: "A comfortable house located beside a peaceful river.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    price: 1700,
    location: "Rishikesh",
    country: "India"
  },
  {
    title: "Ocean View Apartment",
    description: "Enjoy breathtaking ocean views from this modern apartment.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    price: 2800,
    location: "Kochi",
    country: "India"
  },
  {
    title: "Countryside Farmhouse",
    description: "A peaceful farmhouse surrounded by fields and nature.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    price: 1400,
    location: "Pune",
    country: "India"
  },
  {
    title: "Snowy Chalet",
    description: "A warm and cozy chalet perfect for a winter vacation.",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c",
    price: 3000,
    location: "Gulmarg",
    country: "India"
  },
  {
    title: "Tropical Bungalow",
    description: "A beautiful bungalow surrounded by tropical greenery.",
    image: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6",
    price: 2100,
    location: "Alappuzha",
    country: "India"
  },
  {
    title: "Heritage Haveli",
    description: "Experience traditional architecture in this historic haveli.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    price: 2600,
    location: "Jodhpur",
    country: "India"
  },
  {
    title: "Garden Villa",
    description: "A spacious villa with a beautiful private garden.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
    price: 2300,
    location: "Bengaluru",
    country: "India"
  },
  {
    title: "Lakeside Resort",
    description: "A relaxing resort offering peaceful lakeside views.",
    image: "https://images.unsplash.com/photo-1499244571948-7ccddb3583f1",
    price: 3200,
    location: "Nainital",
    country: "India"
  },
  {
    title: "Modern Loft",
    description: "A stylish loft with contemporary interiors and city views.",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9",
    price: 1900,
    location: "Delhi",
    country: "India"
  },
  {
    title: "Jungle Treehouse",
    description: "An adventurous treehouse surrounded by dense forest.",
    image: "https://images.unsplash.com/photo-1520984032042-162d526883e0",
    price: 1600,
    location: "Wayanad",
    country: "India"
  },
  {
    title: "Sunset Beach House",
    description: "A beautiful beach house perfect for watching sunsets.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2",
    price: 2700,
    location: "Pondicherry",
    country: "India"
  },
  {
    title: "Mountain View Resort",
    description: "A comfortable resort offering panoramic mountain views.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    price: 2400,
    location: "Mussoorie",
    country: "India"
  },
  {
    title: "Royal Heritage Hotel",
    description: "A luxurious heritage hotel with traditional Indian interiors.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    price: 4000,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Peaceful Ashram Stay",
    description: "A simple and peaceful stay surrounded by nature.",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
    price: 900,
    location: "Rishikesh",
    country: "India"
  },
  {
    title: "Luxury Penthouse",
    description: "A premium penthouse with stunning skyline views.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: 5000,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Coastal Cottage",
    description: "A cozy cottage located close to the sea.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    price: 1800,
    location: "Gokarna",
    country: "India"
  },
  {
    title: "Tea Garden Homestay",
    description: "Stay among beautiful tea gardens and misty hills.",
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e",
    price: 1400,
    location: "Darjeeling",
    country: "India"
  },
  {
    title: "Desert Villa",
    description: "A luxurious villa inspired by traditional desert architecture.",
    image: "https://plus.unsplash.com/premium_photo-1697730286559-98b1a193eef6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGphaXNhbG1lcnxlbnwwfHwwfHx8MA%3D%3D",
    price: 2900,
    location: "Jaisalmer",
    country: "India"
  },
  {
    title: "Forest Cabin",
    description: "A secluded wooden cabin perfect for a peaceful getaway.",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8",
    price: 1250,
    location: "Coorg",
    country: "India"
  },
  {
    title: "City Center Studio",
    description: "A compact studio apartment in the center of the city.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    price: 1100,
    location: "Hyderabad",
    country: "India"
  },
  {
    title: "Riverside Cottage",
    description: "A charming cottage with beautiful riverside surroundings.",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
    price: 1550,
    location: "Haridwar",
    country: "India"
  },
  {
    title: "Luxury Mountain Resort",
    description: "A premium resort offering luxury rooms and mountain views.",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
    price: 4500,
    location: "Manali",
    country: "India"
  },
  {
    title: "Seaside Retreat",
    description: "A peaceful retreat just steps away from the beach.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 2000,
    location: "Andaman",
    country: "India"
  }
];
module.exports = {data:sampleListing};