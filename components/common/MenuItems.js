import ThemeSwitcher from "./ThemeSwitcher";

export const rightSideMenuItems = (
  <div className="flex items-center space-x-2">
    <ThemeSwitcher />
  </div>
);

export const mainMenuItems = [
  { href: "/", label: "Home" },
  { href: "/", label: "Smart Watches" },
  { href: "/about", label: "About" },
  { href: "/contribute", label: "Contribute" },
  { href: "/disclaimer", label: "Disclaimer" },
];
