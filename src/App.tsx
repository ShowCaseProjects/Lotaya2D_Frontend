import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./routes/AppRoutes"

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
      initialDataUpdatedAt:Date.now(),
      retry:1
    }
  }
});
function App() {
return(
  <>
   <AuthProvider>
      <QueryClientProvider client={queryClient}>
              <AppRoutes />
       </QueryClientProvider>
 </AuthProvider>
 </>);
}

export default App;