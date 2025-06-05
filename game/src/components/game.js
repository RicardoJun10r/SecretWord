import { useEffect, useRef } from 'react';
import { words } from '../db.js';
import "./game-style.css";

export function Game({
    setReiniciar
}) {
    const primeiro = useRef("");
    const segundo = useRef("");
    const terceiro = useRef("");
    const quarto = useRef("");
    const quinto = useRef("");

    const size = words.length;
    let palavra = words[Math.random() * size | 0];
    console.log("Palavra escolhida: ", palavra);
    const palavra_array = palavra.split("");
    console.log("Palavra em array: ", palavra_array);
    function rodada() {
        return (
            <div className='linha'>
                <input id='cell_id' className='cell _1' ref={primeiro} />
                <input id='cell_id' className='cell _2' ref={segundo} />
                <input id='cell_id' className='cell _3' ref={terceiro} />
                <input id='cell_id' className='cell _4' ref={quarto} />
                <input id='cell_id' className='cell _5' ref={quinto} />
            </div>
        )
    }

    function limpar() {
        primeiro.current.value = "";
        segundo.current.value = "";
        terceiro.current.value = "";
        quarto.current.value = "";
        quinto.current.value = "";
        document.getElementById('cell_id').value = '';
    }

    function testar() {
        if (primeiro.current.value === "" ||
            segundo.current.value === "" ||
            terceiro.current.value === "" ||
            quarto.current.value === "" ||
            quinto.current.value === "") {
            alert("Preencha todos os campos!");
            return;
        }

        // if(primeiro.current.value === palavra_array[0]){

        // }
        if (primeiro.current.value === palavra_array[0] &&
            segundo.current.value === palavra_array[1] &&
            terceiro.current.value === palavra_array[2] &&
            quarto.current.value === palavra_array[3] &&
            quinto.current.value === palavra_array[4]) {
            alert("Parabéns, você acertou!");
        } else {
            document.querySelector('.tentativas_jogadas').appendChild(
                document.createElement('li')
            ).innerHTML = `<span>${primeiro.current.value}${segundo.current.value}${terceiro.current.value}${quarto.current.value}${quinto.current.value}</span>`;
            limpar();
        }
    }

    useEffect(() => {
        window.document.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                testar();
            }
        });
    }, []);

    return (
        <div>
            <ul className='tentativas_jogadas'>

            </ul>
            {rodada()}
        </div>
    )
}