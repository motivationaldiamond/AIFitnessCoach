//user.model.ts

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Optional if not needed on the frontend
  createdAt: Date;
}
