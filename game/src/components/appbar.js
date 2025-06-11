import './appbar-style.css';

export function Header({
    handleModal
}) {

    return (
        <header className='appbar'>
            <h1>Secret Word</h1>
            <button onClick={handleModal}>?</button>
        </header>
    )
}