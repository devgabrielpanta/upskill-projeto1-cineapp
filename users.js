import { filmes, users } from "./globals.js";
import {
  logModificouLista,
} from "./logs.js";

// Adicionar um novo utilizador no sistema
export function criarUser(nome, email) {
  const novoUser = {
    nome,
    email,
    lista: [],
    visualizados: [],
  };
  users.push(novoUser);
}

// Adiciona ou remove um filme à "minha coleção" (lista) do utilizador
export function atualizarUserLista(utilizador, filme, action) {
  if (action !== "adicionar" || action !== "remover") return;
  users.map((user) =>
    user.nome !== utilizador.nome
      ? user
      : { ...user, lista: handleUserLista(user.lista, filme, action) }
  );

  logModificouLista(utilizador, filme, action);
}

// Adiciona o título do filme à lista de filmes visualizados do utilizador
export function marcarComoVisto(user, filme) {
  users.map((utilizador) =>
    utilizador.nome !== user.nome
      ? utilizador
      : {
          ...utilizador,
          visualizados: utilizador.visualizados.includes(filme.titulo)
            ? utilizador.visualizados
            : [...utilizador.visualizados, filme.titulo],
        }
  );
}

// Lista de filmes que o utilizador ainda não assistiu
export function filmesPendentes(user) {
  return filmes.filter((filme) => !user.visualizados.includes(filme.titulo));
}

// Helper que retorna a lista de títulos atualizada com base na ação (adicionar ou remover)
function handleUserLista(lista, filme, action) {
  let updatedLista = lista;
  const titulo = filme.titulo;
  if (action === "adiconar") {
    if (!updatedLista.includes(titulo)) {
      updatedLista.push(titulo);
    }
  } else if (action === "remover") {
    updatedLista.filter((item) => item !== titulo);
  }
  return updatedLista;
}
