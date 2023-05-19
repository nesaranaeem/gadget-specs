import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { mainMenuItems, rightSideMenuItems } from "../common/MenuItems";
import Link from "next/link";
import { SearchBox } from "../common/SearchBox";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }
  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <header className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-white lg:flex lg:items-center lg:justify-between dark:bg-gray-900 text-black dark:text-white">
        {/* Hamburger icon (mobile only) */}
        <div className="flex items-center justify-between lg:hidden">
          <button className="p-2 rounded-md" onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="w-6 h-6 text-black dark:text-blue-600" />
            ) : (
              <FaBars className="w-6 h-6 text-black dark:text-blue-600" />
            )}
          </button>
          <Link
            href="/"
            className="text-black dark:text-white text-xl font-bold font-mono px-2"
          >
            Gadgets
          </Link>

          <div />
          {rightSideMenuItems}
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="block py-4 lg:hidden">
            {mainMenuItems.map((menuItem) => (
              <>
                <Link
                  className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  href={menuItem.href}
                  key={menuItem.href}
                  onClick={closeMenu}
                >
                  {menuItem.label}
                </Link>
              </>
            ))}
          </nav>
        )}

        {/* Desktop menu */}
        <nav className="hidden lg:flex lg:items-center lg:justify-end text-gray-700 dark:text-white">
          <Link href="/" className="text-xl font-bold font-mono px-2">
            Gadgets
          </Link>

          {mainMenuItems.map((menuItem) => (
            <>
              <Link
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                href={menuItem.href}
                key={menuItem.href}
              >
                {menuItem.label}
              </Link>
            </>
          ))}
        </nav>

        <div className="hidden lg:block">{rightSideMenuItems}</div>
      </header>
      <div className="px-4 py-5 border-b border-gray-600 dark:border-gray-800 bg-white  dark:bg-gray-900 dark:text-white">
        <SearchBox />
      </div>
    </>
  );
}
