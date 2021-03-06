import axios from "axios";

const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

const _fetchProducts = (products) => ({
  type: FETCH_PRODUCTS,
  products,
});

const _addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

const _editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
});

const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_fetchProducts(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const addProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const { data: newProduct } = await axios.post("/api/products", { token, product });
      dispatch(_addProduct(newProduct));
    } catch (err) {
      console.error(err);
    }
    history.push("/admin");
  };
};

export const editProduct = (product, history) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const { data: updated } = await axios.put(`/api/products/${product.id}`, { token, product });
    dispatch(_editProduct(updated));
    history.push("/admin");
  };
};

export const deleteProduct = (id, history) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const { data: product } = await axios.delete(`/api/products/${id}`, { token, product });
    dispatch(_deleteProduct(product));
    history.push("/admin");
  };
};

const initalState = [];

export const productsReducer = (state = initalState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    case EDIT_PRODUCT:
      return state.map((product) => {
        return product.id === action.product.id ? action.product : product;
      });
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
};
