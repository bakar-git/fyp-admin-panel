import { LayoutGrid, LogOut, User, SunIcon, MoonIcon, Globe, Check } from "lucide-react";
import { useThemeStore } from "@/stores/theme-store";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" }
];

export function UserNav() {
  const { setTheme, theme } = useThemeStore();
  const [currentLang, setCurrentLang] = useState("en");

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative size-10 rounded-full"
              >
                <Avatar className="size-10">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src="#" alt="user name" />
              <AvatarFallback className="rounded-lg">SF</AvatarFallback>
            </Avatar>
            <div className="grid ml-2 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">email</span>
              <span className="truncate text-xs">name</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link href="/profile" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400" />
              My Profile
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DropdownMenuItem className="hover:cursor-pointer">
                <Globe className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400" />
                <span>Language</span>
              </DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className="hover:cursor-pointer"
                  onClick={() => setCurrentLang(lang.code)}
                >
                  <span>{lang.name}</span>
                  {currentLang === lang.code && (
                    <Check className="w-4 h-4 ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}
          <DropdownMenuItem className="hover:cursor-pointer flex items-center justify-between" onSelect={(e) => e.preventDefault()}>
            <div className="flex items-center">
              <div className="relative w-4 h-4 mr-3">
                <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0 text-neutral-500 dark:text-neutral-400" />
                <MoonIcon className="absolute top-0 h-4 w-4 rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100 text-neutral-500 dark:text-neutral-400" />
              </div>
              Dark Mode
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => {  }}>
          <Link className="flex items-center w-full" href="/logout" method="post">
            <LogOut className="w-4 h-4 mr-3 text-neutral-500 dark:text-neutral-400" />
            Sign out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
