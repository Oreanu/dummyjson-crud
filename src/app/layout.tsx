import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TanstackProvider } from "@/lib/providers/tanstack-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const sofiaPro = {
  variable: "--font-sofia-pro",
  className: "font-sofia-pro",
};

export const metadata: Metadata = {
  title: "DummyJSONCRUD | Simple CRUD Operations with DummyJSON API",
  description:
    "A lightweight Next.js application that performs Create, Read, Update, and Delete (CRUD) operations using the DummyJSON API.",
  openGraph: {
    title: "DummyJSONCRUD | Effortless API CRUD Operations",
    description:
      "Perform seamless CRUD operations with the DummyJSON API in a Next.js environment. Ideal for testing and quick API interactions.",
    url: "https://dummyjsoncrud.example.com",
    siteName: "DummyJSONCRUD",
    images: [
      {
        url: "/assets/img/dummyjson_preview.png",
        width: 1200,
        height: 630,
        alt: "DummyJSONCRUD interface preview",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DummyJSONCRUD | Next.js CRUD App",
    description:
      "A simple yet effective Next.js app for testing CRUD operations with the DummyJSON API.",
    images: ["/assets/img/dummyjson_preview.png"],
  },
};

export const viewport: Viewport = {
  maximumScale: 1.0,
  initialScale: 1.0,
  userScalable: false,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DummyJSONCRUD",
              description:
                "A lightweight Next.js application that performs Create, Read, Update, and Delete (CRUD) operations using the DummyJSON API.",
              url: "https://dummyjsoncrud.example.com",
              applicationCategory: "WebApplication",
              operatingSystem: "All",
            }),
          }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>

      <body
        className={`${sofiaPro.variable} antialiased h-screen overflow-hidden`}
        suppressHydrationWarning={true}
      >
        <TanstackProvider>
          <Toaster position="top-right" />
          <Navbar />
          <div className="py-16 h-screen overflow-y-auto px-[7%]">
            {children}
          </div>
        </TanstackProvider>
      </body>
    </html>
  );
}
