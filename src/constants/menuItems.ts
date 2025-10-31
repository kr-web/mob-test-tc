import Generate from "@/assets/icons/menu/lamp-charge.svg?react";
import Trash from "@/assets/icons/common/trash.svg?react";
import TestCase from "@/assets/icons/menu/task-square.svg?react";

import Project from "@/assets/icons/menu/note.svg?react";

export const menuItems = [
  { label: "Generate", icon: Generate, link: "/" },
  { label: "TestCase", icon: TestCase, link: "/tcList" },
  { label: "Project", icon: Project, link: "disabled" },
  { label: "Trash", icon: Trash, link: "/trash" },
];
