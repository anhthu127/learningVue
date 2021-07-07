export default interface User {
  id: number;
  name: string;
  email: string;
}

export const UserInit: User = {
  id: 0,
  name: "",
  email: "",
};
