### Instalation
 * https://www.heroui.com/docs/frameworks/nextjs
 * npx create-next-app -e https://github.com/heroui-inc/next-app-template

### Layout
* https://br.pinterest.com/pin/770678555018472230/

### Hooks
* React.useMemo = React Hook que faz cache de resultados entre "re-renders"
  - é como se fosse o watch do vue

* React.useCallback = React Hook que deixa fazer cache de uma função entre "re-renders"

* React.useEffect é como se fosse o watch do vue
  - É executado após a renderização do componente



### Tela Students (page.tsx)

1- "studentsData" recebe os dados dos estudantes.

2- Filtra os estudantes antes da paginação.

3- Atualiza a paginação sempre que os itens filtrados mudam.