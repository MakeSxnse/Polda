import { Denk_One } from "next/font/google";
import "./globals.css";
import { GameProvider } from "../context/GameContext";
import CustomCursor from "../components/CustomCursor";

const denkOne = Denk_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-denk",
  display: "swap",
});

export const metadata = {
  title: "Polda - Záhada smyčky",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${denkOne.variable} h-full`}>
      <body className="m-0 h-full select-none bg-black" style={{ cursor: 'none' }}>
        <GameProvider>
          <CustomCursor />
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
