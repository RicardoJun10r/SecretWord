import React from "react";
import { WordContext } from "../hook/word-hook"
import "./footbar-style.css"

const teclas = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

export function Footer() {

    const { heads, characters } = React.useContext(WordContext);

    React.useEffect(() => {
        const handleCharacter = () => {
            let chaves = heads();
            if (chaves.length === 0) {
                document.querySelectorAll(".tecla").forEach(tecla => tecla.style.color = 'black')
            } else {
                for (let i = 0; i < chaves.length; i++) {
                    if (teclas.includes(chaves[i])) {
                        document.getElementById(`tecla_${chaves[i]}`).style.color = 'red';
                    }
                }
            }
        }
        handleCharacter();
    }, [characters, heads])

    return (
        <footer className='rodape'>
            <div id="teclado" className="teclado">
                <div id="tecla_q" className="tecla">Q</div>
                <div id="tecla_w" className="tecla">W</div>
                <div id="tecla_e" className="tecla">E</div>
                <div id="tecla_r" className="tecla">R</div>
                <div id="tecla_t" className="tecla">T</div>
                <div id="tecla_y" className="tecla">Y</div>
                <div id="tecla_u" className="tecla">U</div>
                <div id="tecla_i" className="tecla">I</div>
                <div id="tecla_o" className="tecla">O</div>
                <div id="tecla_p" className="tecla">P</div>
            </div>
            <div className="teclado">
                <div id="tecla_a" className="tecla">A</div>
                <div id="tecla_s" className="tecla">S</div>
                <div id="tecla_d" className="tecla">D</div>
                <div id="tecla_f" className="tecla">F</div>
                <div id="tecla_g" className="tecla">G</div>
                <div id="tecla_h" className="tecla">H</div>
                <div id="tecla_j" className="tecla">J</div>
                <div id="tecla_k" className="tecla">K</div>
                <div id="tecla_l" className="tecla">L</div>
            </div>
            <div className="teclado">
                <div id="tecla_z" className="tecla">Z</div>
                <div id="tecla_x" className="tecla">X</div>
                <div id="tecla_c" className="tecla">C</div>
                <div id="tecla_v" className="tecla">V</div>
                <div id="tecla_b" className="tecla">B</div>
                <div id="tecla_n" className="tecla">N</div>
                <div id="tecla_m" className="tecla">M</div>
            </div>
        </footer>
    )
}