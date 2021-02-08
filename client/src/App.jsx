import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUser] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/api/users').then((response) => {
      console.log(response.data);
      setUser(response.data);
    });
  }, []);
  return users !== null ? (
    <div className="App">
      {
       users.map((user) => (
         <div>
           <p>{user.username}</p>
         </div>

       ))
      }
    </div>
  ) : (
    <div>
      <p>PAS DE DATAS</p>
      <p>HELLO WORLD</p>
    </div>
  );
}

export default App;
