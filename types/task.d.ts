import { Category, User } from "@prisma/client";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: string;
  priority: string;
  term: Date;
  createdAt: Date;
  updatedAt: Date;
  assignedUsers: User[];
  author: User;
};
