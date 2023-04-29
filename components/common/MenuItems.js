import ThemeSwitcher from "./ThemeSwitcher";

export const rightSideMenuItems = (
  <div className="flex items-center space-x-2">
    <ThemeSwitcher />
  </div>
);

export const mainMenuItems = [
  { href: "/", label: "Home" },
  { href: "/brands", label: "Brands" },
  { href: "/smart-phones", label: "Smart Phones" },
  { href: "/smart-watches", label: "Smart Watches" },
  { href: "/compare", label: "Compare" },
  { href: "/disclaimer", label: "Disclaimer" },
];
