import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  LayoutGridIcon,
  UsersIcon,
  Users2Icon,
  UserPlus2Icon,
  PackageIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
  permission?: string;
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGridIcon,
          submenus: []
        }
      ],
      permission: "manage-users"
    },
    {
      groupLabel: "Users",
      menus: [
        {
          href: "/users",
          label: "All Users",
          icon: Users2Icon,
          submenus: []
        }
      ],
      permission: "manage-users"
    },
    {
      groupLabel: "Subscriptions",
      menus: [
        {
          href: "/checkout/index",
          label: "Plans",
          icon: PackageIcon,
          submenus: []
        }
      ],
      permission: "view-plans"
    },
    // {
    //   groupLabel: "Contents",
    //   menus: [
    //     {
    //       href: "",
    //       label: "Posts",
    //       icon: SquarePen,
    //       submenus: [
    //         {
    //           href: "/dashboard/posts",
    //           label: "All Posts"
    //         },
    //         {
    //           href: "/posts/new",
    //           label: "New Post"
    //         }
    //       ]
    //     },
    //     {
    //       href: "/categories",
    //       label: "Categories",
    //       icon: Bookmark
    //     },
    //     {
    //       href: "/tags",
    //       label: "Tags",
    //       icon: Tag
    //     }
    //   ]
    // },
  ];
}
