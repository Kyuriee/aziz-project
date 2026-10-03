import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight/index.css";
import "@fontsource/inter-tight/latin-800.css"; // statis: kontur bersih untuk teks outline
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { site } from "@/data/site";


// String.raw: backslash tetap utuh di dalam script inline
const debugScript = String.raw`(function () {
  if (!/[?&]debug/.test(location.search)) return;
  var box = document.createElement("pre");
  box.style.cssText = "position:fixed;z-index:2147483647;left:0;right:0;bottom:0;max-height:50%;overflow:auto;margin:0;padding:8px;background:#900;color:#fff;font:11px/1.3 monospace;white-space:pre-wrap";
  function add(m) {
    if (!box.parentNode) document.documentElement.appendChild(box);
    box.textContent += m + "\n";
  }
  window.addEventListener("error", function (e) {
    add((e.message || "error") + " @" + String(e.filename || "").split("/").pop() + ":" + e.lineno);
  });
  window.addEventListener("unhandledrejection", function (e) {
    add("promise: " + ((e.reason && e.reason.message) || e.reason));
  });
})();`;

export const metadata = {
  title: site.title,
  description: site.description,
};

export const viewport = { themeColor: "#050505" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Tambah ?debug di URL: error JS tampil di layar (berguna untuk iPhone tanpa Mac) */}
        <script dangerouslySetInnerHTML={{ __html: debugScript }} />
        <noscript>
          <style>{`.line, .pre{visibility:visible!important} .pre{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
