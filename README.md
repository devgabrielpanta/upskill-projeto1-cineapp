# CineApp - Projeto 1 do Upskill

## Autores

- [@devgabrielpanta](https://www.github.com/devgabrielpanta)
- [@antoniocfigueira](https://www.github.com/antoniocfigueira)

## Descrição

- Aplicação simples para gerir a tua coleção de filmes e o que queres ver a seguir.
- Mantém três fontes de dados: a coleção de filmes, a lista de usuários e um log de atividades do utilizador.

### Funcionalidades do sistema:

- Adicionar/remover filmes.
- Editar a lista de géneros de filmes manualmente.
- Adicionar utilizadores.
- Monitorizar as atividades dos utilizadores por um log.
- Gerar relatórios.

### Funcionalidades para os utilizadores:

- Assistir um filme.
- Adicionar/remover um filme da coleção (lista).
- Avaliar um filme.
- Pesquisar por género.
- Pesquisar por título.
- Obter lista de filmes pendentes (não vistos).

## Itens complementares

### Caça aos bugs

Documentação que ilustra como os autores identificaram e lideram com problemas (folder "caca-bug`).

### Fluxogramas

#### Listar pendentes

![Listar pendentes (Draw.io)](./fluxo-listar-pendentes.png)
Ilustra o comportamento da função a seguir, responsável por listar os filmes do sistema que um determinado usuário ainda não assistiu:

```javascript
function filmesPendentes(user) {
  return filmes.filter((filme) => !user.visualizados.includes(filme.titulo));
}
```

#### Média de avaliações

![Média de avaliações (Draw.io)](./fluxo-media-avaliacoes.png)
Ilustra o comportamento da função a seguir, responsável por calcular o rating de um filme com base nos reviews:

```javascript
function atualizarAvalicao(movie) {
  let avaliacaoCount = 0;
  let avaliacaoTotal = 0;
  let avaliacaoRating = 0;

  const currentReviews = movie.avaliacao.reviews;
  if (currentReviews.length > 0) {
    avaliacaoCount = currentReviews.length;
    avaliacaoTotal = currentReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    avaliacaoRating = avaliacaoTotal / avaliacaoCount;
  }

  filmes.map((filme) =>
    filme.titulo !== movie.titulo
      ? filme
      : {
          ...movie,
          avaliacao: {
            ...filme.avaliacao,
            count: avaliacaoCount,
            rating: avaliacaoRating,
          },
        }
  );
}
```
