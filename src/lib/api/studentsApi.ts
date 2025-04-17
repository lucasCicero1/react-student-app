import { User as IUser } from "@/src/types";

export async function getStudents(): Promise<IUser[] | []> {
  const studentsResponse = await fetch(
    "http://localhost:3001/v1/list/students",
  );

  if (!studentsResponse.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return studentsResponse.json();
}

export async function createStudent(student: Partial<IUser>): Promise<void> {
  const response = await fetch(`http://localhost:3001/v1/create/student`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }
}
