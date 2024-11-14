import "@/app/globals.css";
import { Providers } from "@/components/providers/Providers";

export const metadata = {
  title: "Craft Waitlist like a pro with The Poster.xyz",
  description: "A simple, one-step tool to instantly create a waitlist.",
  keywords: "Waitlist, Poster Waitlist, Waitlist Maker",
  authors: [{ name: "Kanish Kumar" }],
  creator: "Kanish Kumar",
  publisher: "The Poster",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theposter.xyz/",
    site_name: "The Poster",
    title: "Craft Waitlist like a pro with The Poster.xyz",
    description: "A simple, one-step tool to instantly create a waitlist.",
    images: [
      {
        url: "https://theposter.xyz/meta.png",
        width: 1200,
        height: 630,
        alt: "A simple, one-step tool to instantly create a waitlist.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theposter",
    creator: "@theposter",
    title: "Craft Waitlist like a pro with The Poster.xyz",
    description: "A simple, one-step tool to instantly create a waitlist.",
    images: ["https://theposter.xyz/meta.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
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
