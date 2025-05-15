import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../app/store';
import { apiSlice } from '../app/api';

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState?: PreloadedState<Partial<RootState>>;
    store?: ReturnType<typeof configureStore>;
    renderOptions?: Omit<RenderOptions, 'wrapper'>;
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
