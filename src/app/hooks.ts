import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
/**
 * Typed version of `useDispatch`
 * @returns The typed dispatch function.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed version of `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 