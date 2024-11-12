"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose, MdShield, MdAccessibility } from "react-icons/md";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";

type IndexHeaderProps = {
  showButtons?: boolean;
};

const IndexHeader: React.FC<IndexHeaderProps> = ({ showButtons = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const redirectTo = (path: string): void => {
    router.push(path);
  };

  const Logo: React.FC = () => (
    <Image
      className="cursor-pointer"
      onClick={(): void => redirectTo("/")}
      src="/images/index-header-logo.png"
      alt="index-header-logo.png"
      width={200}
      height={56}
      priority
    />
  );

  const NavButtons: React.FC = () =>
    showButtons ? (
      <>
        <button
          onClick={(): void => redirectTo("/login")}
          className="register-button md:mr-[10px]"
        >
          Ingrese aquí
        </button>
        <button
          onClick={(): void => redirectTo("/register")}
          className="account-button"
        >
          Abrir Caja Plus
        </button>
      </>
    ) : null;

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

    return (
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
    );
  };

  return (
    <div className="h-[78px] main-background shadow-1 flex items-center px-[20px] justify-between z-50">
      <Logo />

      <div className="justify-self-end">
        <div className="hidden md:flex">
          <NavButtons />
        </div>
        <div className="flex md:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <GiHamburgerMenu className="w-[30px] h-[30px]" />
          </button>
        </div>
      </div>

      <MobileMenu />
    </div>
  );
};

export default IndexHeader;
