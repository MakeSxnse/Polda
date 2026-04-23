import { Denk_One } from "next/font/google";
import "./globals.css";
import { GameProvider } from "../context/GameContext";

const denkOne = Denk_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-denk",
  display: "swap",
});

export const metadata = {
  title: "Polda - Poločas rozpadu",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${denkOne.variable} h-full`}>
      <body className="m-0 h-full overflow-hidden select-none bg-black">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}
