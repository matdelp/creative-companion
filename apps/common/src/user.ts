export type User = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
};

export type UserGoogle = {
  id: string;
  email: string;
};
