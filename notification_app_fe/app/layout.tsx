import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Box } from "@mui/material";
import ThemeRegistry from "@/components/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CAMPUS NOTIFICATIONS-SHRUTHIKA",
  description: "Stay updated with campus events, results, and placements.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body className={inter.className}>
        <ThemeRegistry>
          <Navbar />
          <Box component="main" sx={{ py: 4 }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
