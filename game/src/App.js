import "./app.css"
import React from "react";
import { Header } from "./components/appbar";
import { Footer } from "./components/footbar";
import { Game } from "./components/game";

function App() {
  const [modal, setModal] = React.useState(false);

  const open = () => {
    console.log("Abrindo modal");
    setModal(true);
  }

  const close = () => {
    console.log("Fechando modal");
    setModal(false);
  }

  function Modal() {
    return (
      <dialog className="modal">
        <div className="modal-content">
          <span className="close" style={{ cursor: 'pointer' }} onClick={close}>&times;</span>
          <h1>Bem vindo ao Secret Word!</h1>
          <p>Esse é um simples jogo onde você deve adivinhar a palavra secreta.</p>
          <p>Digite uma letra em cada caixa e pressione Enter para tentar adivinhar.</p>
          <p>Boa sorte!</p>
          <p>Espero que goste!</p>
        </div>
      </dialog>
    )
  }

  return (
    <main>
      <Header handleModal={open} />
      <div className="container">
        {modal && <Modal />}
        <div>
          <Game />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App;
