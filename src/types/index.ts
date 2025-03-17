import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
}

// export interface User {
//   ra: string;
//   name: string;
//   email: string;
//   cpf: string;
//   status: string;
// }
