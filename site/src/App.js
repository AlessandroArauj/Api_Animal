import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [sexo, setSexo] = useState([]);
  const [sexoSelecionado, setSelecionado] = useState(0);

  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [dieta, setDieta] = useState('');
  const [id, setId] = useState(0);
  

  const [erro, setErro] = useState('');

  async function listarGenero() {
    let r = await axios.get('http://localhost:5000/animal/sexos');
    setSexo(r.data);

  }



  async function Salvar(){
    
    try {
      let Animais = {
      
        idSexoSelecionado: setSelecionado,
        especie: setEspecie,
        idade: setIdade,
        dieta: setDieta

      }

        if(id == 0){
        
        let r = await axios.post('http://localhost:5000/animal', Animais)
        alert('Animal Cadastrado')
        }

      
      

    } catch (err) {
      setErro(err.response.data.erro)
    }
  
  }

  useEffect(() => {
    //
    listarGenero();
  
  
  })


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
              <select id='Sexo' name='Sexo' value={sexoSelecionado} onChange={e => setSelecionado(e.target.value)}>
                  <option value={0}> Selecione </option>
                  {sexo.map(item =>
                    

                    <option value={item.id}> {item.Sexo} </option>
                    )}

              </select>
            </div>

            <div>
              <p>Idade</p>
              <input type='text' />

              <p>Dieta Alimentar</p>
              <input></input>
            </div>
          </div>

          <button>Salvar Informações</button>

        </div>
      </section>


      <section className='f2'>
        <h1> Consultar os Animais</h1>

        <label>
          <input type='text' />
          <img src='../assets/images/lupa.svg' />
        </label>

        <div className='line2' />

      </section>
    </div>
  );
}

export default App;
