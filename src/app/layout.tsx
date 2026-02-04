import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "9Graphix - Creative Logo & Graphic Design Solutions",
  description: "Professional logo design, branding, and graphic design services by 9Graphix. Transform your brand with stunning visuals.",
  keywords: "logo design, graphic design, branding, visiting card, letterhead, festival posters, 9Graphix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
