import LeftSide from "@/components/aside/leftSide/LeftSide";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";

export default function MainLayout({ children }) {
  return (
    <ThemeProvider attribute="class">
      <Header />
      <div className="min-h-screen flex flex-row lg:flex-row bg-white shadow-lg dark:bg-gray-900">
        {/*
          Show the aside item only on screens wider than lg (large)
          and give it 3 columns (out of 12) width.
        */}
        <aside className="hidden lg:block lg:w-3/12 lg:flex-shrink-0 bg-white shadow-lg dark:bg-gray-900 p-4">
          <LeftSide />
        </aside>

        <div className="flex-grow">
          <main className="container mx-auto">
            {/* 
              Show the children in 9 columns (out of 12) width 
              on all screens.
            */}
            <div className="lg:w-9/12 bg-white shadow-lg dark:bg-gray-900">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
