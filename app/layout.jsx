import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight/index.css";
import "@fontsource/inter-tight/latin-800.css"; // statis: kontur bersih untuk teks outline
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { site } from "@/data/site";

export const metadata = {
  title: site.title,
  description: site.description,
};

export const viewport = { themeColor: "#050505" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Fallback tanpa JS: teks tetap terlihat */}
        <noscript>
          <style>{`.line, .pre{visibility:visible!important} .pre{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
