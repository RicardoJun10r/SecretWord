import "./app.css"
import React from "react";
import { Header } from "./components/appbar";
import { Footer } from "./components/footbar";
import { Game } from "./components/game";
import { Words } from "./hook/word-hook";

function App() {
  const [modal, setModal] = React.useState(false);

  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if(modal){
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modal])
  const open = () => {
    setModal(true);
  }

  const close = () => {
    setModal(false);
  }

  function Modal() {
    return (
      <dialog ref={modalRef} onClose={close} className="modal">
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
      <Words>
        <Header handleModal={open} />
        <div className="container">
          {modal && <Modal />}
          <div>
            <Game />
          </div>
        </div>
        <Footer />
      </Words>
    </main>
  );
}

export default App;
