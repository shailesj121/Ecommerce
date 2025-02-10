import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const baseUrl = "https://ecommercebackend-self.vercel.app"

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
