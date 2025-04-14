import { createContext, useContext } from "react";
import { LOCAL_STORAGE_MESSAGES_KEY } from "../services/constants";
import { useLocalStorage } from "../hooks/useLoacalStorage";

const LocalStorageMessagesContext = createContext();

function LocalStorageMessagesProvider({ children }) {
  const [messages, setMessages] = useLocalStorage(
    [],
    LOCAL_STORAGE_MESSAGES_KEY,
  );

  return (
    <LocalStorageMessagesContext.Provider value={[messages, setMessages]}>
      {children}
    </LocalStorageMessagesContext.Provider>
  );
}

function useLocalStorageMessages() {
  const context = useContext(LocalStorageMessagesContext);
  if (context === undefined) {
    throw new Error(
      "LocalStorageMessagesContext was used outside LocalStorageMessagesProvider",
    );
  }
  return context;
}

export { LocalStorageMessagesProvider, useLocalStorageMessages };
