import "./globals.css";

export const metadata = {
  title: "Whistle",
  description: "Meteorology Code",
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
