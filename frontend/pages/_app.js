import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/contexts/theme";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
