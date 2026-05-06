import Layout from "@/components/Layout";

import "@/styles/globals.css";

export const metadata = {
  title: "TorinFly",
  description: "تور داخلی خارجی -تور های مسافرتی داخلی و خارجی با تورین فلای",
  name: "viewport",
  content: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/0cc35c17f7a788c67c05c7ab013e0a3564baafd9.png",
    apple: "/0cc35c17f7a788c67c05c7ab013e0a3564baafd9.png",
  },
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
