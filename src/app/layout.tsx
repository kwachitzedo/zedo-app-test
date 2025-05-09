import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
	variable: "--font-josefin",
	subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
	title: "ZEDO",
	description: "Zedo Designers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${josefinSans.variable} antialiased font-sans`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
