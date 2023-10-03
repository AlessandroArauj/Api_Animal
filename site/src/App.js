import './App.css';

function App() {
  return (
    <div className="App">
      <header></header>

      <section className='f1'>


        <h1>Editar ou inserir</h1>
        <div className='line' />
        <div className='card'>

          <div>
            <div>
              <p>Espécie</p>
              <input type='text' />

              <p>Genêro</p>
              <select></select>
            </div>

            <div>
              <p>Idade</p>
              <input type='text' />

              <p>Dieta Alimentar</p>
              <select></select>
            </div>
          </div>

          <button></button>

        </div>
      </section>


      <seciton className='f2'>
        <h1> Consultar os Animais</h1>

        <label>
          <input type='text' />
          <img src='../assets/images/lupa.svg' />
        </label>

        <div className='line2' />

      </seciton>
    </div>
  );
}

export default App;
