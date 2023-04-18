import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalState = (props) => {
  const [currentIsbn, setCurrentIsbn] = useState();
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const storedIsStarted = localStorage.getItem("isStarted");
    if (storedIsStarted !== null) {
      setIsStarted(JSON.parse(storedIsStarted));
    }
  }, [isStarted]);

  const handleSetIsStarted = (value) => {
    localStorage.setItem("isStarted", JSON.stringify(value));
    setIsStarted(value);
  };
  //   console.log(isStarted);
  return (
    <GlobalContext.Provider
      value={{
        currentIsbn,
        setCurrentIsbn,
        isStarted,
        handleSetIsStarted,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
