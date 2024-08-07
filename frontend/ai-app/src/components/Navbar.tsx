'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <SimpleFloatingNav />
      </header>
        {children}
    </>
  );
};

const SimpleFloatingNav = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed left-[50%] top-8 flex w-fit -translate-x-[50%] items-center gap-6 rounded-lg border-[1px] border-neutral-700 bg-neutral-950 p-2 text-sm text-neutral-500">
      <Logo />

      <NavLink href="/">Home</NavLink>
      <NavLink href="/chat">Chat</NavLink>
      {user ? (
        <>
          <NavLink href="/profile">Profile</NavLink>
          <AuthButton onClick={logout}>
            Logout
          </AuthButton>
        </>
      ) : (
        <div className="flex gap-2">
            <AuthButton href="/login">Login</AuthButton>
            <AuthButton href="/register">Register</AuthButton>
        </div>
      )}
    </nav>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg viewBox="0 0 24 24" data-name="025_SCIENCE" id="_025_SCIENCE" xmlns="http://www.w3.org/2000/svg" width="30" height="30">
      <defs>
        <style>{`.cls-1{fill:#ffffff;}`}</style>
      </defs>
      <g id="SVGRepo_iconCarrier">
        <path className="cls-1" d="M16,13H8a3,3,0,0,1-3-3V6A3,3,0,0,1,8,3h8a3,3,0,0,1,3,3v4A3,3,0,0,1,16,13ZM8,5A1,1,0,0,0,7,6v4a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1Z" />
        <path className="cls-1" d="M10,9a1.05,1.05,0,0,1-.71-.29A1,1,0,0,1,10.19,7a.6.6,0,0,1,.19.06.56.56,0,0,1,.17.09l.16.12A1,1,0,0,1,10,9Z" />
        <path className="cls-1" d="M14,9a1,1,0,0,1-.71-1.71,1,1,0,0,1,1.42,1.42,1,1,0,0,1-.16.12.56.56,0,0,1-.17.09.6.6,0,0,1-.19.06Z" />
        <path className="cls-1" d="M12,4a1,1,0,0,1-1-1V2a1,1,0,0,1,2,0V3A1,1,0,0,1,12,4Z" />
        <path className="cls-1" d="M9,22a1,1,0,0,1-1-1V18a1,1,0,0,1,2,0v3A1,1,0,0,1,9,22Z" />
        <path className="cls-1" d="M15,22a1,1,0,0,1-1-1V18a1,1,0,0,1,2,0v3A1,1,0,0,1,15,22Z" />
        <path className="cls-1" d="M15,19H9a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v6A1,1,0,0,1,15,19Zm-5-2h4V13H10Z" />
        <path className="cls-1" d="M5,17a1,1,0,0,1-.89-.55,1,1,0,0,1,.44-1.34l4-2a1,1,0,1,1,.9,1.78l-4,2A.93.93,0,0,1,5,17Z" />
        <path className="cls-1" d="M19,17a.93.93,0,0,1-.45-.11l-4-2a1,1,0,1,1,.9-1.78l4,2a1,1,0,0,1,.44,1.34A1,1,0,0,1,19,17Z" />
      </g>
    </svg>
  );
};

const NavLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link href={href} className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-neutral-50">
          {children}
        </span>
      </motion.div>
    </Link>
  );
};

const AuthButton = ({ onClick, href, children }: { onClick?: () => void; href?: string; children: React.ReactNode }) => {
  const ButtonContent = () => (
    <span
      className={`
          relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px]
          border-neutral-700 px-4 py-1.5 font-medium
         text-neutral-300 transition-all duration-300

          before:absolute before:inset-0
          before:-z-10 before:translate-y-[200%]
          before:scale-[2.5]
          before:rounded-[100%] before:bg-neutral-50
          before:transition-transform before:duration-1000
          before:content-[""]

          hover:scale-105 hover:border-neutral-50 hover:text-neutral-900
          hover:before:translate-y-[0%]
          active:scale-100`}
    >
      {children}
    </span>
  );

  if (href) {
    return (
      <Link href={href}>
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button onClick={onClick}>
      <ButtonContent />
    </button>
  );
};
