### Instalation
 * https://www.heroui.com/docs/frameworks/nextjs
 * npx create-next-app -e https://github.com/heroui-inc/next-app-template

### Layout
* https://br.pinterest.com/pin/770678555018472230/

### Hooks
* React.useMemo = React Hook que faz cache de resultados entre "re-renders"
  - é como se fosse o watch do vue
  - É executado durante a renderização.
  - Retorna um valor memoizado.

* React.useCallback = React Hook que deixa fazer cache de uma função entre "re-renders"

* React.useEffect é como se fosse o watch do vue
  - É executado após a renderização do componente
  - Não retorna valor (só executa código).



### State
* Quando o estado muda (setStudentsData([])), o componente é renderizado novamente.


### Tela Students (page.tsx)

1- "studentsData" recebe os dados dos estudantes.

2- Filtra os estudantes antes da paginação.

3- Atualiza a paginação sempre que os itens filtrados mudam.


### Layout
* O arquivo layout.tsx recebe "children", "children" é o arquivo page.tsx

### "use server" e "use client"
* Não é possível rodar um componente "use client" em um componente sem a flag ou "use server" (mesma coisa)
* É possível rodar um componente "use server" em um componente "use client"


### React Query
* Recomendado quando na tela pode ter MUIIIITAAA interação do usuário

### App tipo dashboard (não recebe muitas visitas) e Ecommerce (muitas visitas)
* (Dashboard) Pode fazer mais uso de Cliente component, React Query...
* (Ecommerce) Usar mais Server component e usar o máximo de cache do Nextjs
