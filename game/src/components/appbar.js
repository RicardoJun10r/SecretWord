import './appbar-style.css';

export function Header({
    handleModal
}) {

    return (
        <header className='cabeca'>
            <h1>Secret Word</h1>
            <button onClick={handleModal}>Ajuda</button>
        </header>
    )
}