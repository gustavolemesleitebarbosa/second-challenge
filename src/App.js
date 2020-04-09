import React, { useState,useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>console.log(repositories),[repositories])

  async function handleAddRepository() {
    api
      .post("/repositories", {
        title: "ReactJs",
        url: "www.google.com",
        techs: ["React", "Angular"],
      })
      .then((response) => setRepositories([...repositories, response.data]))
      .catch((err) => console.log(err));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then(() =>
        setRepositories(
          repositories.filter((repository) => repository.id !== id)
        )
      )
      .catch(() => console.log("erro ao deletar"));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
               {"Remover"}
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
