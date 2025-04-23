import { User as IUser } from "@/src/types";

const url = "https://student-hub-api.onrender.com/v1/";

export async function getStudents(): Promise<IUser[] | []> {
  const studentsResponse = await fetch(`${url}list/students`);

  if (!studentsResponse.ok) {
    throw new Error("Erro ao buscar dados da API");
  }

  return studentsResponse.json();
}

export async function createStudent(
  student: Omit<IUser, "id" | "ra">,
): Promise<void> {
  const response = await fetch(`${url}create/student`, {
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

export async function updateStudent(
  student: Omit<IUser, "id" | "ra">,
): Promise<void> {
  const response = await fetch(`${url}update/student`, {
    method: "PATCH",
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

export async function deleteStudent({
  cpf,
}: Pick<IUser, "cpf">): Promise<void> {
  const response = await fetch(`${url}delete/student?cpf=${cpf}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da API");
  }
}
