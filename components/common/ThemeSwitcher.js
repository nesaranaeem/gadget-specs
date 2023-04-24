import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      <label htmlFor="theme-toggle" className="cursor-pointer">
        {theme === "dark" ? (
          <BsSunFill className="w-10 h-10 text-amber-300" />
        ) : (
          <BsMoonFill className="w-10 h-10 text-blue-600" />
        )}
      </label>
      <input
        id="theme-toggle"
        type="checkbox"
        className="hidden"
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        checked={theme === "dark"}
      />
    </div>
  );
}
