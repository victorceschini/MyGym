import Login from "./components/Login.js";
import Aluno from "./components/Aluno.js";
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user === null ? (
        <header className="App-header">
          <Login setUser={setUser} />
        </header>
      ) : (
        <>
          <Aluno setUser={setUser}/>
        </>
        
      )}
    </div>
  );
}

export default App;
