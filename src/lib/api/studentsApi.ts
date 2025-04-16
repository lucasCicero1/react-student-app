import { User as IUser } from "@/src/types";
import { users } from "@/src/lib/data";

export async function getStudents(): Promise<IUser[]> {
  // const res = await fetch(
  //   `https://student-hub-api.onrender.com/v1//list/students`,
  // );

  // console.log("res", res);

  // if (!res.ok) {
  //   throw new Error("Erro ao buscar dados da API");
  // }

  // return res.json();
  return users;
}
