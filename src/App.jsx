import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import GlobalLayout from "./components/layout/GlobalLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalLayout>
          <AppRoutes />
        </GlobalLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
