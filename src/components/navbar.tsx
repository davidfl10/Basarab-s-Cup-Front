// NextUI
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import {Avatar} from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

// configs
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
// icons
import {
  FacebookIcon,
  InstagramIcon,
  SearchIcon,
} from "@/components/icons";
import Logo from "/Logo.jpg";

//contexts
import AppContext from '../contexts/context';
import { useContext } from "react";

export const Navbar: React.FC = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Navbar must be used within an AppContext.Provider");
  }

  const { loggedIn } = context;

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <img className="w-12 h-12 rounded-3xl" src={Logo} alt="logo" />
            <p className="font-bold text-inherit">BASARAB'S</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.facebook}>
            <FacebookIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.instagram}>
            <InstagramIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        {loggedIn 
        ?
        <Link href="/profile">
          <Avatar showFallback src='https://images.unsplash.com/broken' />
        </Link> 
        :
        <Link href="/login">
          <Button color="primary" variant="solid">
            Login 
          </Button> 
        </Link>
      }
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.instagram}>
          <InstagramIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="primary"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {
          loggedIn 
          ? 
          <NavbarMenuItem key={siteConfig.navItems.length+1}>
              <Link
                color="primary"
                href="/profile"
                size="lg"
              >
                Profile
              </Link>
            </NavbarMenuItem>
          :
          <NavbarMenuItem key={siteConfig.navItems.length+1}>
              <Link
                color="primary"
                href="/login"
                size="lg"
              >
                Login
              </Link>
            </NavbarMenuItem>
          }
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
