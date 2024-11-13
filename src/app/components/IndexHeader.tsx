"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdShield, MdAccessibility, MdLogout } from "react-icons/md";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import {
  INDEX_APP_ROUTE,
  LOGIN_ROUTE,
  PORTAL_ROUTE,
  REGISTER_ROUTE,
} from "@/app/common/constants/appConfig";
import Link from "next/link";

const IndexHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const Logo: React.FC = () => (
    <Link href={INDEX_APP_ROUTE}>
      <Image
        className="cursor-pointer"
        src="/images/index-header-logo.png"
        alt="index-header-logo.png"
        width={200}
        height={56}
        priority
      />
    </Link>
  );

  const NavButtons: React.FC = () => {
    switch (pathname) {
      case INDEX_APP_ROUTE:
        return (
          <>
            <Link href="/login">
              <button className="register-button md:mr-[10px] justify-center font-bold">
                <p>Ingrese aquí</p>
              </button>
            </Link>
            <Link href="/register">
              <button className="account-button bold justify-center font-bold">
                <p>Abrir Caja Plus</p>
              </button>
            </Link>
          </>
        );
      case PORTAL_ROUTE:
        return (
          <Link href="/login">
            <button className="register-button md:mr-[10px] justify-center font-bold">
              <MdLogout className="mr-[10px]" />
              <p>Cerrar sesión</p>
            </button>
          </Link>
        );
      case LOGIN_ROUTE:
        return (
          <Link href="/register">
            <button className="account-button bold justify-center font-bold">
              <p>Abrir Caja Plus</p>
            </button>
          </Link>
        );
      case REGISTER_ROUTE:
        return (
          <Link href="/login">
            <button className="register-button md:mr-[10px] justify-center font-bold">
              <p>Ingrese aquí</p>
            </button>
          </Link>
        );
      default:
        return null;
    }
  };

  type MenuItemProps = {
    text: string;
    IconComponent?: IconType;
  };

  const MenuItem: React.FC<MenuItemProps> = ({ text, IconComponent }) => (
    <>
      <div className="border-b my-[20px] flex items-center hover:cursor-pointer">
        {IconComponent && (
          <IconComponent className="w-[20px] h-[20px] mr-[10px]" />
        )}
        <span>{text}</span>
      </div>
      <div className="border-solid border-t-[0.5px]"></div>
    </>
  );

  const MobileMenu: React.FC = () => {
    if (!isMenuOpen) return null;

    return pathname === INDEX_APP_ROUTE ? (
      <div className="fixed inset-0 main-background flex justify-center z-50 overflow-hidden">
        <div className="main-container w-[80vw]">
          <div className="flex justify-between">
            <Logo />
            <button onClick={() => setIsMenuOpen(false)}>
              <MdClose className="w-[30px] h-[30px]" />
            </button>
          </div>

          <div className="text-center mt-5 pb-5 bottom-shadow ">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
              <NavButtons />
            </div>
          </div>
          <div>
            <MenuItem text="Bienestar Financiero" />
            <MenuItem IconComponent={MdShield} text="Transparencia" />
            <MenuItem IconComponent={MdAccessibility} text="Accesibilidad" />
          </div>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="h-[78px] main-background shadow-1 flex items-center px-[20px] justify-between z-50">
      <Logo />

      <div className="justify-self-end">
        <div className="hidden md:flex">
          <NavButtons />
        </div>
        {pathname === INDEX_APP_ROUTE ? (
          <div className="flex md:hidden">
            <button onClick={() => setIsMenuOpen(true)}>
              <GiHamburgerMenu className="w-[30px] h-[30px]" />
            </button>
          </div>
        ) : null}
      </div>

      <MobileMenu />
    </div>
  );
};

export default IndexHeader;
