import { createContext } from "react";

const defaultState: [number, React.Dispatch<React.SetStateAction<number>>] = [
  0,
  () => {},
];

export const TotalUsageContext = createContext(defaultState);
