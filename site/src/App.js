import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  const [sexo, setSexo] = useState([]);
  const [sexoSelecionado, setSelecionado] = useState(0);

  const [dieta, setDieta] = useState([]);
  const [dietaSelecionada, setDietaSelecionada] = useState(0);

  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [id, setId] = useState(0);
  

  const [erro, setErro] = useState('');

  async function listarDieta() {
    let r = await axios.get('http://localhost:5000/animal/dieta');
    setDieta(r.data);
  
  }

  async function listarGenero() {
    let r = await axios.get('http://localhost:5000/animal/sexos');
    setSexo(r.data);

  }

  async function removerAnimal(id) {
    let r = await axios.delete('http://localhost:5000/animal/delete/' + id)
    alert('animal foi excluido')

    BuscarAnimais()
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

        else {
          let r = await axios.put('http://localhost:5000/animal/altera', Animais)
          alert('Animal foi alterado')
        }


        BuscarAnimais()

        setSexo('');
        setDieta('');
        setEspecie('');
        setIdade('');
        setDietaSelecionada(0);
        setSelecionado(0);

      
      

    } catch (err) {
      setErro(err.response.data.erro)
    }
  
  }


  async function BuscarAnimais() {
  
    let r = await axios.get('http://localhost:5000/animal/nome?nome=' + busca);
    setListaAnimal(r.data);
  
  }

  useEffect(() => {
    //
    listarGenero();
  
  
  })

  useEffect(() => {
    //
    listarDieta();
  
  
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
              <select id='Dieta' name='Dieta' value={dietaSelecionada} onChange={e => setDietaSelecionada(e.target.value)}>
                  <option value={0}> Selecione </option>
                  {dieta.map(item =>
                    

                    <option value={item.id}> {item.Dieta} </option>
                    )}

              </select>
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
