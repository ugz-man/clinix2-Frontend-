import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout";
import ChatForm from "./components/ChatForm";
import ChatView from "./components/ChatView";
import ShowStartModal from "./components/ShowStartModal";
import { LocalStorageMessagesProvider } from "./contexts/LocalStorageMessagesContext";
import { SendMessageStateProvider } from "./contexts/SendMessageStateContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      {/* The modal shown at the start of the app */}
      <ShowStartModal />
      {/* // Provides the messages to every of its children */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
        <AppLayout>
          <LocalStorageMessagesProvider>
            <SendMessageStateProvider>
              {/* Where the messages are displayed */}
              <ChatView />
              {/* Where the text area and send button are displayed */}
              <ChatForm />
            </SendMessageStateProvider>
          </LocalStorageMessagesProvider>
        </AppLayout>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{
            top: "8px",
            right: "8px",
            bottom: "8px",
            left: "8px",
          }}
          toastOptions={{
            custom: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
