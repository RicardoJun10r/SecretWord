import React from "react";
import "./app.css"
import { Header } from "./components/appbar";
import { Footer } from "./components/footbar";
import { Game } from "./components/game";

function App() {
  const [modal, setModal] = React.useState(false);

  const toogleModal = () => {
    setModal(!modal);
  }

  function Modal(){
    return(
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={toogleModal}>&times;</span>
          <h2>Ajuda</h2>
          <p>Esse é um simples jogo onde você deve adivinhar a palavra secreta.</p>
          <p>Digite uma letra em cada caixa e pressione Enter para tentar adivinhar.</p>
          <p>Boa sorte!</p>
        </div>
      </div>
    )
  }

  return (
    <main>
      <Header />
      <div className="container">
        <h1>Bem vindo ao Secret Word!</h1>
        <p>Esse é um simples jogo.</p>
        <p>Espero que goste!</p>
        <div className="opcoes">
          <button onClick={toogleModal}>Ajuda</button>
        </div>
        <div className="game-container">
          {modal && <Modal />}
          <Game />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
