import Script from "next/script";

export const metadata = {
  title: "AIMA Content Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main id="main-content">
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" strategy="afterInteractive" />
      <noscript>Enable JavaScript to use the AIMA content admin.</noscript>
    </main>
  );
}
