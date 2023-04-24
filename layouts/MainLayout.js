import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";

export default function MainLayout({ children }) {
  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
