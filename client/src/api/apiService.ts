import axios, { AxiosError } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const getProductInfo = async ({ productId }: { productId: string }) => {
  try {
    if (productId) {
      const response = await axios.get(`${baseUrl}/product/info/${productId}`);

      return response;
    } else {
      throw new AxiosError("Eksik veya hatalı ürün ID'si.");
    }
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

const getNewProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/product/new`);

    return response.data;
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

const getPopularProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/product/popular`);

    return response.data;
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

const addFavorite = async ({
  token,
  productId,
}: {
  productId: string;
  token: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/addFavorite`,
      {
        token,
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

const removeFavorite = async ({
  token,
  productId,
}: {
  productId: string;
  token: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/removeFavorite`,
      {
        token,
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

const getAllCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/category/getAllCategories`);

    return response;
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

const getCategoriesProduct = async ({ categoryId }: { categoryId: string }) => {
  try {
    const response = await axios.get(`${baseUrl}/category/info/${categoryId}`);

    return response;
  } catch (error) {
    console.error(error);

    return (error as AxiosError).response;
  }
};

export {
  addFavorite,
  getAllCategories,
  getCategoriesProduct,
  getNewProducts,
  getPopularProducts,
  getProductInfo,
  removeFavorite,
};
