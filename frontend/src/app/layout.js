import Layout from "@/components/Layout";

import "@/styles/globals.css";

export const metadata = {
  title: "TorinFly",
  description: "تور داخلی خارجی -تور های مسافرتی داخلی و خارجی با تورین فلای",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
};
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
