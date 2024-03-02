import axios, { AxiosError } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

interface getProductInfoProps {
  productId: string;
}

interface addFavoriteProps {
  productId: string;
  token: string;
}

interface removeFavoriteProps {
  productId: string;
  token: string;
}

const getProductInfo = async ({ productId }: getProductInfoProps) => {
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

const addFavorite = async ({ token, productId }: addFavoriteProps) => {
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

const removeFavorite = async ({ token, productId }: removeFavoriteProps) => {
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

export {
  addFavorite,
  getNewProducts,
  getPopularProducts,
  getProductInfo,
  removeFavorite,
};
