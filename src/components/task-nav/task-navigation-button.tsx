"use client";

import { useState } from "react";

export default function TaskNav() {
  const [currentNav, setCurrentNav] = useState<string>("Task");

  const navItems = [
    { id: 1, name: "Task" },
    { id: 2, name: "Report" },
  ];

  return (
    <>
      <div className="fle my-2 rounded-xl">
        {navItems.map((item) => (
          <button
            className={`border border-black ${
              currentNav === item.name
                ? "bg-black dark:bg-white text-white font-bold dark:text-black"
                : ""
            } py-1 px-4 cursor-pointer font-bold  text-sm`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentNav(item.name);
            }}
            key={item.id}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
}
