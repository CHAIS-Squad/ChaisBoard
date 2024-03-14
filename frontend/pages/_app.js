import { AuthProvider } from "@/contexts/auth";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
