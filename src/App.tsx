import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./routes/AppRoutes";
import { AxiosErrorHandlerProvider } from "./libs/axiosErrorHandler";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      initialDataUpdatedAt: Date.now(),
      retry: 1,
    },
  },
});
function App() {
  return (
    <>
      <AuthProvider>
        <AxiosErrorHandlerProvider>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </AxiosErrorHandlerProvider>
      </AuthProvider>
    </>
  );
}

export default App;
