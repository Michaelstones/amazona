import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Michael",
      email: "admin@xyz.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jamil",
      email: "jamil@xyz.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: "1",
      name: "Nike slim shirt",
      slug: "nike-slim-shirt",
      category: "shirt",
      images: "/images/p1.jpg",
      price: 120,
      countInstock: 10,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },

    {
      // _id: "2",
      name: "Addidas fit shit",
      slug: "addidas-fit-shit",
      category: "shirt",
      images: "/images/p2.jpg",
      price: 120,
      countInstock: 0,
      brand: "Addidas",
      rating: 2.0,
      numReviews: 6,
      description: "high quality shirt",
    },
    {
      // _id: "3",
      name: "puma slim shirt",
      slug: "puma-slim-pant",
      category: "shirt",
      images: "/images/p3.jpg",
      price: 3000,
      countInstock: 10,
      brand: "puma",
      rating: 3.5,
      numReviews: 10,
      description: "high quality shirt",
    },
    {
      // _id: "4",
      name: "EASport slim shirt",
      slug: "EASport-slim-pant",
      category: "shirt",
      images: "/images/p4.jpg",
      price: 120,
      countInstock: 10,
      brand: "EASport",
      rating: 4.5,
      numReviews: 10,
      description: "high quality shirt",
    },
  ],
};

export default data;
