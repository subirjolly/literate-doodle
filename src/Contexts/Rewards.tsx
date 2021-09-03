import {createContext, FC, useState} from 'react';

interface RewardsContextType {
  getPoints: () => number;
  clearPoints: () => void;
  addPoints: (_: number) => void;
}

const DEFAULT_CONTEXT = {
  getPoints: () => 0,
  clearPoints: () => null,
  addPoints: (_: number) => null,
};

export const RewardsContext = createContext<RewardsContextType>(DEFAULT_CONTEXT);

const RewardsProvider: FC = ({children}) => {
  const [points, setPoints] = useState(0);

  const getPoints = () => {
    return points;
  };

  const clearPoints = () => {
    setPoints(0);
  };

  const addPoints = (morePoints: number) => {
    setPoints(points + morePoints);
  };

  return (
    <RewardsContext.Provider
      value={{
        getPoints,
        addPoints,
        clearPoints,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export default RewardsProvider;
