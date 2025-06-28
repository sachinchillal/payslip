"use client";
import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop, ChevronDown, Check, Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/company', label: 'Company' },
  // { href: '/header', label: 'Header' },
  { href: '/employee', label: 'Employee' },
  { href: '/amount', label: 'Amount' },
  { href: '/generate', label: 'Generate' },
];

const Header: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);


  const currentThemeIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />;
    }
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4 mr-2" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 mr-2" /> },
    { value: 'system', label: 'System', icon: <Laptop className="w-4 h-4 mr-2" /> },
  ];

  return (
    <header className="app-header bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo and Title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              {/* Logo Placeholder */}
              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 dark:bg-indigo-600 rounded-full mr-3 group-hover:opacity-80 transition-opacity">
                {/* You can put an SVG or img tag here */}
                <Image src="/payslip.jpg" width={100} height={100} alt="Payslip Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <h1 className="font-bold text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Payslip Generator
              </h1>
            </Link>
          </div>

          {/* Right Side: Nav Links and Theme Switcher */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-5">
              {navLinks.map((link) => (
                <Link href={link.href} key={link.label} className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Theme Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="flex items-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                aria-label="Change theme"
              >
                {currentThemeIcon()}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${isThemeDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {isThemeDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  onMouseLeave={() => setIsThemeDropdownOpen(false)} // Close on mouse leave
                >
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setTheme(opt.value);
                        setIsThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center ${theme === opt.value
                        ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        } transition-colors`}
                    >
                      {opt.icon}
                      {opt.label}
                      {theme === opt.value && <Check className="w-4 h-4 ml-auto text-indigo-600 dark:text-indigo-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button (Optional - for smaller screens) */}
            <div className="md:hidden">
              <button
                onClick={() => alert("Mobile menu clicked!")} // Replace with actual mobile menu toggle logic
                className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Menu />
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
