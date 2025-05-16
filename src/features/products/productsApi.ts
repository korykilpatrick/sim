import { apiSlice } from '@app/api';
import { BaseProduct, ProductType } from '@shared-types/product';

interface ProductsResponse {
  products: BaseProduct[];
  total: number;
}

interface ProductResponse {
  product: BaseProduct;
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductsResponse,
      { type?: ProductType; search?: string }
    >({
      query: ({ type, search }) => {
        let url = '/products';
        const params = new URLSearchParams();

        if (type) {
          params.append('type', type);
        }

        if (search) {
          params.append('search', search);
        }

        const queryString = params.toString();
        return url + (queryString ? `?${queryString}` : '');
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    getProduct: builder.query<ProductResponse, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApiSlice;
