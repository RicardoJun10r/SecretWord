import React from 'react';
import { words } from '../db.js';
import "./game-style.css";
import { WordContext } from '../hook/word-hook.js';

export function Game() {

    const { push, clear } = React.useContext(WordContext);

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            testar();
        }
    }

    const handleArrowKeyPress = (e) => {
        if (e.key === "ArrowRight") {
            indexador = (indexador + 1) % 5
            letras.current[indexador].focus()
        }
        if (e.key === "ArrowLeft") {
            var tmp = (indexador - 1) % 5
            indexador = tmp < 0 ? 4 : tmp
            letras.current[indexador].focus()
        }
    }

    const getWord = () => {
        return words[Math.random() * size | 0];
    }

    const [gameId, setGameId] = React.useState(0);

    React.useEffect(() => {
        handlePalavraRestart(getWord().split(''))
        window.addEventListener("keypress", handleEnterKeyPress);
        window.addEventListener("keydown", handleArrowKeyPress);
        return () => {
            window.removeEventListener("keypress", handleEnterKeyPress);
            window.removeEventListener("keydown", handleArrowKeyPress);
        }
    }, [gameId]);

    const contador = React.useRef(0);
    const letras = React.useRef([]);
    const size = words.length;
    const [palavra, setPalavra] = React.useState(getWord().split(''));
    let indexador = 0;

    const handlePalavraRestart = (update) => {
        if (gameId !== 0) {
            if (palavra === update) {
                handlePalavraRestart(getWord().split(''))
            } else {
                setPalavra(update)
                return;
            }
        }
    }

    function log_refs() {
        for (let i = 0; i < letras.current.length; i++) {
            console.log(`letra ${i}: `, letras.current[i].value);
        }
    }

    function rodada() {
        return (
            <div className='linha'>
                {
                    palavra.map((_, index) => {
                        return (
                            <input key={index} maxLength={1} type='text' id='cell_id' className={`cell`} ref={el => letras.current[index] = el} />
                        )
                    })
                }
            </div>
        )
    }

    function restart() {
        setGameId(id => id + 1)
    }

    function limpar() {
        for (let i = 0; i < letras.current.length; i++) {
            letras.current[i].value = "";
        }
        document.getElementById('cell_id').value = '';
    }

    function validar_letra(letra) {
        return /^[a-zA-Z]$/.test(letra);
    }

    function validar_letras() {
        for (let i = 0; i < letras.current.length; i++) {
            if (!validar_letra(letras.current[i].value)) {
                return true;
            }
        }
        return false;
    }

    function is_empty_or_null() {
        for (let i = 0; i < letras.current.length; i++) {
            if (letras.current[i].value === "" || letras.current[i].value === undefined) {
                alert("Preencha todos os campos!");
                return true;
            }
        }
    }

    function verificar_se_ganhou() {
        for (let i = 0; i < letras.current.length; i++) {
            if (letras.current[i].value !== palavra[i]) {
                return false;
            }
        }
        return true;
    }

    function adicionar_class_list(element, letra, index) {
        if (palavra[index] === letra) {
            element.classList.add("certo");
        }
        else if (palavra.includes(letra)) {
            element.classList.add("quase");
        }
        else {
            element.classList.add("errado");
        }
    }

    function adicionar_letra(letra, index) {

        const fragmento = document.getElementById('tentativa')

        if (fragmento) {
            let span = fragmento.appendChild(
                document.createElement('span')
            )
            span.classList.add("cell")
            span.innerHTML = `${letra}`;

            adicionar_class_list(span, letra, index);
        } else {
            let tentativa = document.querySelector('.painel').appendChild(
                document.createElement('div')
            )
            tentativa.id = 'tentativa';
            tentativa.classList.add('tentativas_jogadas');
            let span = tentativa.appendChild(
                document.createElement('span')
            )
            span.classList.add("cell")
            span.innerHTML = `${letra}`
            adicionar_class_list(span, letra, index)
        }

    }

    function limpar_tentativas() {
        var parent = document.querySelector('.painel');
        var child = document.getElementById('tentativa');
        if (parent) {
            parent.innerHTML = "";
        }
    }

    function ganhou() {
        alert("Parabéns, você acertou!");
        limpar();
        limpar_tentativas();
        contador.current = 0;
        restart()
        clear()
    }

    function perdeu() {
        alert("Você perdeu! A palavra era: " + palavra);
        limpar();
        limpar_tentativas();
        contador.current = 0;
        restart()
        clear()
    }

    function testar() {
        if (is_empty_or_null()) return;
        log_refs();
        if (validar_letras()) {
            alert("Digite apenas letras!");
            limpar();
            return;
        }
        contador.current = contador.current + 1;
        if (verificar_se_ganhou()) {
            ganhou();
            return;
        } else {
            if (contador.current === 5) {
                perdeu()
                return;
            }
            for (let i = 0; i < letras.current.length; i++) {
                adicionar_letra(letras.current[i].value, i);
                push(letras.current[i].value)
            }
            limpar();
        }
    }

    return (
        <div className='board'>
            <div className='painel'>
                <div id='tentativa' className='tentativas_jogadas' />
            </div>
            {rodada()}
        </div>
    )
}