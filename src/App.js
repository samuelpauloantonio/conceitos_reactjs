import React  from "react";

import "./styles.css";
import { useEffect, useState } from "react";

import  api from './services/api'


function App() {


const [currentValue, setToupdadeRepositorie] = useState([])

  useEffect(() => {

    api.get('repositories').then( result => {

      setToupdadeRepositorie(result.data)
      
    })
 
  }, [])

  async function handleAddRepository() {

    const result = await api.post('repositories', {
      url: "https://github.com/samuelpauloantonio",
      title: "Aprendedo React",
      techs: ["React", "Node.js"],
    })

    setToupdadeRepositorie([...currentValue, result.data])
    
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`)

    setToupdadeRepositorie(currentValue.filter(respository => (
      respository.id != id
    ))) 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { currentValue.map(repository => (
           <li key = {repository.id}> 
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
