import { Home, User, GraduationCap } from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <Home height={25} width={25} />,
        label: "Home",
        href: "/",
        visible: ["admin", "student"],
      },
      {
        icon: <GraduationCap height={25} width={25} />,
        label: "Students",
        href: "/students",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <User height={25} width={25} />,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "student"],
      },
    ],
  },
];

export function Menu() {
  return (
    <div className="m-4 text-sm">
      {menuItems.map((item) => (
        <div key={item.title} className="flex flex-col gap-2">
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {item.title}
          </span>
          {item.items.map((subItem) => (
            <Link
              key={subItem.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2"
              href={subItem.href}
            >
              {subItem.icon}
              <span className="hidden lg:block">{subItem.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
