import "./globals.css";

export const metadata = {
  title: "GUI Pokemon TCG Stock Manager",
  description: "Graphical user interface that helps to visualize the stock management of a small store in tcgmatch.",
  icons: {
    icon: [
      { 
        url: "/favicon.ico",
      },
      {
        url: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { 
        url: "/apple-icon.png",
        type: "image/png" 
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
