import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  /**
   * useEffect: usado para disparar funções quando alguma informação for alterada
   * Primeiro parâmetro diz qual função queremos disparar, o segundo diz quando essa função será disparada.
   * 
   * useState: sempre começo com o mesmo tipo de informação que será armazenado. No exemplo usado, será inicializado como um array vazio. É usado para salvar.
   * Retorna a variável com seu valor inicial e uma função para atualizarmos o valor inicial. No caso, usamos a variável repositories e a função setRepositories para atualizar o valor.
   * 
   * api.get: vai acessar os repositórios e quando retornar a resposta vai para o then
   */

   const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      //response é a resposa que eu consegui quando acessei os repositórios e o data é onde são guardados o id, title, url e techs. Então o response.data pega as informações que eu preciso acessar no repositório.
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    //crio uma requisição do tipo post para criar um novo repositório.
    //await é usado para eu conseguir usar o mesmo response da useEffect aqui
    const response = await api.post('repositories', {
      title: "Teste",
      url: "www.github.com/testezinho",
      techs: ['ReactJS']
    })

    //Coloco as informações do response.data na variável repository
    const repository = response.data
    //Copio os repositórios e atualizo adicionando um novo
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    //Aqui, usa-se a crase para conseguir pegar o id do repositório desejado
    await api.delete(`repositories/${id}`);
    //Aqui filtra todos os repositórios, garantindo que só os repositórios com o id diferente do que foi removido fiquem.
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }
        //.map é usado para percorrer algo e retornar alguma informação. No caso, ele percorre todos os repositórios e retorna os títulos
        //key é a informação que caracteriza cada repositório como único. No caso, o id.
  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
