import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// set authorization token for all request
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

// base api
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["products", "singleProduct", "sell"],
  endpoints: (builder) => ({
    // add products
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: "product/add-product",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["products"],
    }),

    // edit product
    editProduct: builder.mutation({
      query: (option) => {
        return {
          url: `product/edit-product/${option.id}`,
          method: "PUT",
          body: option.data,
        };
      },
      invalidatesTags: ["products", "singleProduct"],
    }),

    // get product
    getProduct: builder.query({
      query: ({
        brand,
        category,
        material,
        occasion,
        minPrice,
        maxPrice,
        theme,
      }) => {
        const params = new URLSearchParams();
        if (brand) {
          params.append("brand", brand);
        }
        if (category) {
          params.append("category", category);
        }
        if (material) {
          params.append("material", material);
        }
        if (occasion) {
          params.append("occasion", occasion);
        }
        if (minPrice) {
          params.append("minPrice", String(minPrice));
        }
        if (maxPrice) {
          params.append("maxPrice", String(maxPrice));
        }
        if (theme) {
          params.append("theme", theme);
        }

        return {
          url: `product/get-products?${params}`,
          method: "GET",
        };
      },
      providesTags: ["products"],
    }),

    // delete single product
    deleteSingleProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/single-delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["products"],
    }),

    // delete multiple product
    deleteManyProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/product/multiple-delete`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["products"],
    }),

    // getsSingle Product
    getSingleProduct: builder.query({
      query: (id) => {
        return {
          url: `product/get-product/${id}`,
          method: "GET",
        };
      },
      providesTags: ["singleProduct"],
    }),

    // product sell
    sellProduct: builder.mutation({
      query: (option) => {
        return {
          url: `product/sell/${option.id}`,
          method: "POST",
          body: option?.data,
        };
      },
      invalidatesTags: ["singleProduct", "sell", "products"],
    }),

    // sell history
    sellHistory: builder.query({
      query: () => {
        return {
          url: `sell/history`,
          method: "GET",
        };
      },
      providesTags: ["sell"],
    }),

    // single sell history
    SingleSellHistory: builder.query({
      query: (id) => {
        return {
          url: `sell/history/${id}`,
          method: "GET",
        };
      },
    }),

    // coupon check history
    getCoupon: builder.query({
      query: (id) => {
        return {
          url: `sell/coupon/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductQuery,
  useDeleteSingleProductMutation,
  useGetSingleProductQuery,
  useEditProductMutation,
  useSellProductMutation,
  useSellHistoryQuery,
  useDeleteManyProductMutation,
  useGetCouponQuery,
  useSingleSellHistoryQuery,
} = baseApi;
