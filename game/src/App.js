import { useState } from "react";
import { Header } from "./components/appbar";
import { Footer } from "./components/footbar";
import "./app.css"
import { Game } from "./components/game";

function App() {
  const [reiniciar, setReiniciar] = useState(false);
  return (
    <main>
      <Header />
      <div className="container">
        <h1>Bem vindo ao Secret Word!</h1>
        <p>Esse é um simples jogo.</p>
        <p>Espero que goste!</p>
        <div className="opcoes">
          <button>Reiniciar</button>
          <button>Ajuda</button>
        </div>
        <div>
          <Game setReiniciar={setReiniciar} />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
