export interface User {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  password: string|null;
  role: string;
}

export interface Category {
  id: number;
  description: string;
}

export interface Question {
  id: string;
  userId: string;
  categoryId: number;
  text: string;
  answers: Answer[];
  creationDate: Date;
}

export interface Answer {
  id: string;
  createdBy: string;
  text:string;
  creationDate: Date;
}