import "./globals.css";

export const metadata = {
  title: "GUI Pokemon TCG Stock Manager",
  description: "Graphical user interface that helps to visualize the stock management of a small store in tcgmatch.",
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
