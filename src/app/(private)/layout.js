import "@/app/globals.css";
import { Providers } from "@/components/providers/Providers";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
