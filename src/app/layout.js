import "@/app/globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata = {
  title: "Poster.xyz",
  description: "Get your Wailist in seconds",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased min-h-screen`}>
        <Providers>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
