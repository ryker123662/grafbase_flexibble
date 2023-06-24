import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Fexibble",
    description:
        "A flexible blog starter for Next.js, with Typescript, Tailwind CSS, and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar/>
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
    );
}
