import React, {useState, useEffect } from "react";

import api from "./services/api";


import "./styles.css";

function App() {
  const [ repositories, setRepositories] = useState([])

  useEffect(() =>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);      
    })
  }, [])



  async function handleAddRepository() {
        //projects.push(`Novo projeto ${Date.now()}`);   
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "Débora Cavallari",
      techs: [`Front-end React  ${Date.now()}`, `Back-end NodeJs ${Date.now()}`]      
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);


  }

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
