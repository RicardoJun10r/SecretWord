import { useEffect, useRef } from 'react';
import { words } from '../db.js';
import "./game-style.css";
import { useWords } from '../hook/word-hook.js';

export function Game() {
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === "Enter") {
                testar();
            }
        }
        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
        }
    }, []);
    const { push } = useWords([]);
    const contador = useRef(0);
    const primeiro = useRef("");
    const segundo = useRef("");
    const terceiro = useRef("");
    const quarto = useRef("");
    const quinto = useRef("");

    const size = words.length;
    const palavra = words[Math.random() * size | 0];
    console.log("Palavra escolhida: ", palavra);
    const palavra_array = palavra.split("");
    console.log("Palavra em array: ", palavra_array);

    function log_refs() {
        console.log("primeiro: ", primeiro.current.value);
        console.log("segundo: ", segundo.current.value);
        console.log("terceiro: ", terceiro.current.value);
        console.log("quarto: ", quarto.current.value);
        console.log("quinto: ", quinto.current.value);
    }

    function rodada() {
        return (
            <div className='linha'>
                <input maxLength={1} type='text' id='cell_id' className='cell _1' ref={primeiro} />
                <input maxLength={1} type='text' id='cell_id' className='cell _2' ref={segundo} />
                <input maxLength={1} type='text' id='cell_id' className='cell _3' ref={terceiro} />
                <input maxLength={1} type='text' id='cell_id' className='cell _4' ref={quarto} />
                <input maxLength={1} type='text' id='cell_id' className='cell _5' ref={quinto} />
            </div>
        )
    }

    function limpar() {
        primeiro.current.value = "";
        segundo.current.value = "";
        terceiro.current.value = "";
        quarto.current.value = "";
        quinto.current.value = "";
        contador.current = 0;
        document.getElementById('cell_id').value = '';
    }

    function validar_letra(letra) {
        const regex = /^[a-zA-Z]$/;
        return regex.test(letra);
    }

    function is_empty_or_null() {
        log_refs();

        if (primeiro.current.value === "" ||
            segundo.current.value === "" ||
            terceiro.current.value === "" ||
            quarto.current.value === "" ||
            quinto.current.value === "") {
            alert("Preencha todos os campos!");
            return true;
        }
        if (primeiro.current.value === undefined ||
            segundo.current.value === undefined ||
            terceiro.current.value === undefined ||
            quarto.current.value === undefined ||
            quinto.current.value === undefined) {
            alert("Preencha todos os campos!");
            return true;
        }
    }

    function verificar_se_ganhou() {
        if (primeiro.current.value === palavra_array[0] &&
            segundo.current.value === palavra_array[1] &&
            terceiro.current.value === palavra_array[2] &&
            quarto.current.value === palavra_array[3] &&
            quinto.current.value === palavra_array[4]) {
            return true;
        }
        return false;
    }

    function adicionar_letra(letra, index) {
        const fragmento = document.getElementById('tentativa').appendChild(
            document.createElement('span')
        );

        fragmento.innerHTML = `${letra}`;

        if (palavra_array[index] === letra) {
            fragmento.classList.add("certo");
        }
        else if (palavra_array.includes(letra)) {
            fragmento.classList.add("quase");
        }
        else {
            fragmento.classList.add("errado");
        }
    }

    function pushQueue(){
        push([primeiro.current.value, segundo.current.value, terceiro.current.value, quarto.current.value, quinto.current.value]);
    }

    function testar() {
        if (is_empty_or_null()) return;
        if (!validar_letra(primeiro.current.value) ||
            !validar_letra(segundo.current.value) ||
            !validar_letra(terceiro.current.value) ||
            !validar_letra(quarto.current.value) ||
            !validar_letra(quinto.current.value)) {
            alert("Digite apenas letras!");
            limpar();
            return;
        }

        contador.current = contador.current + 1;
        pushQueue();
        console.log("Tentativa número: ", contador.current);
        if (verificar_se_ganhou()) {
            alert("Parabéns, você acertou!");
            limpar();
            document.querySelector('.board').removeChild(document.getElementById('tentativa'));
            return;
        } else {
            if (contador.current == 5) {
                alert("Você perdeu! A palavra era: " + palavra);
                limpar();
                document.querySelector('.board').removeChild(document.getElementById('tentativa'));
                return;
            }
            adicionar_letra(primeiro.current.value, 0);
            adicionar_letra(segundo.current.value, 1);
            adicionar_letra(terceiro.current.value, 2);
            adicionar_letra(quarto.current.value, 3);
            adicionar_letra(quinto.current.value, 4);
            document.querySelector('.tentativas_jogadas').appendChild(
                document.createElement('br')
            )
            limpar();
        }
    }

    return (
        <div className='board'>
            <div id='tentativa' className='tentativas_jogadas' />
            {rodada()}
        </div>
    )
}