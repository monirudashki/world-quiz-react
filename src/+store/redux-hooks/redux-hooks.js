import { useDispatch, useSelector } from "react-redux";

export const useResultDispatch = () => useDispatch();
export const useResultSelector = (state) => useSelector(state);

export const useGameCapitalsDispatch = () => useDispatch();
export const useGameCapitalsSelector = (state) => useSelector(state);

export const useGameFlagsDispatch = () => useDispatch();
export const useGameFlagsSelector = (state) => useSelector(state);