import { useMutation } from "@tanstack/react-query";
import { sendTextMessage } from "../services/apiMessages";
import { useLocalStorageMessages } from "../contexts/LocalStorageMessagesContext";
// import toast from "react-hot-toast";

export function useSendMessage() {
  // Context
  const [_, setStoredMessages] = useLocalStorageMessages();

  const { isPending, mutate } = useMutation({
    mutationFn: sendTextMessage,
    onSuccess: (res) => {
      const response = {
        userId: res?.data?.data?.userId,
        clientId:
          crypto?.randomUUID?.() || Math.random().toString(36).substring(2),
        messageType: res?.data?.data?.messageType,
        role: res?.data?.data?.role,
        text: res?.data?.data?.text,
      };
      setStoredMessages((prevMessages) => [...prevMessages, response]);
    },
    // onError: (error) =>
    //   toast.custom((t) => (
    //     <div
    //       className={`bg-white px-6 py-4 shadow-md transition-all duration-75 ease-in ${t.visible ? "ease-in" : "ease-out"}`}
    //     >
    //       {error.message}
    //     </div>
    //   )),
  });

  return { isPending, mutate };
}
