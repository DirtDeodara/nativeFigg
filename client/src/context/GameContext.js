import { createContext, useContext, useMemo, useState } from "react";

const GameContext = createContext();

export const useGameState = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [name, setName] = useState("");

  const contextValue = useMemo(
    () => ({
      name,
      setName,
    }),
    [name, setName]
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
