import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'


function App() {
  const [sexo, setSexo] = useState([]);
  const [sexoSelecionado, setSelecionado] = useState('');

  const [dieta, setDieta] = useState([]);
  const [dietaSelecionada, setDietaSelecionada] = useState('');

  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [id, setId] = useState(0);


  const [erro, setErro] = useState('');
  const [busca, setBuscar] = useState([])

  function AlterarAnimal(item) {

    setEspecie(item.nm_animal);
    setIdade(item.ds_idade);
    setDietaSelecionada(item.id_dieta);
    setSelecionado(item.id_sexo)
    setId(item.id_animal)
  }

  async function listarDieta() {
    let r = await axios.get('http://localhost:5000/animal/dieta');
    setDieta(r.data);

  }

  async function listarGenero() {
    let r = await axios.get('http://localhost:5000/animal/sexos');
    setSexo(r.data);

  }

  async function removerAnimal(id) {
    try {
      let r = await axios.delete('http://localhost:5000/animal/deletar/' + id)
    alert('animal foi excluido')
    } catch (err) {
      alert(err.response.data.erro)
    }

    BuscarAnimais()
  }


  async function Salvar() {

    try {

      let generoId;

      if (sexoSelecionado === 'Macho') {
        generoId = 1;} 
        else if (sexoSelecionado === 'Fêmea') {
        generoId = 2;}

      let Animais = {

        genero: sexoSelecionado,
        dieta: dietaSelecionada,
        nome: especie,
        idade: idade

      }

      if (id == 0) {

        let r = await axios.post('http://localhost:5000/animal', Animais)
        alert('Animal Cadastrado')
      }

      else {
        let r = await axios.put('http://localhost:5000/animal/altera/' + id , Animais)
        alert('Animal foi alterado')
      }


      BuscarAnimais()

     
      setEspecie('');
      setIdade('');
      setDietaSelecionada(0);
      setSelecionado(0);




    } catch (err) {
      alert(err.response.data.erro)
    }

  }


  async function BuscarAnimais() {

    try {
      let r = await axios.get('http://localhost:5000/animal/nome');
    setBuscar(r.data);
    
    } catch (err) {
      alert(err.response.data.erro)
    }

  }

  useEffect(() => {
    //
    listarGenero();
  }, [])

  useEffect(() => {
    //
    listarDieta();
  }, [])




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
              <input type='text' value={especie} onChange={e => setEspecie(e.target.value)} />

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
              <input type='text' value={idade} onChange={e => setIdade(e.target.value)} />

              <p>Dieta Alimentar</p>
              <select id='Dieta' name='Dieta' value={dietaSelecionada} onChange={e => setDietaSelecionada(e.target.value)}>
                <option value={0}> Selecione </option>
                {dieta.map(item =>


                  <option value={item.id}> {item.Dieta} </option>
                )}

              </select>
            </div>
          </div>

          <button onClick={Salvar}> {id == 0 ? 'Salvar' : 'Alterar'} </button>

        </div>
      </section>


      <section className='f2'>
        <h1> Consultar os Animais</h1>

        <label>
          <button onClick={BuscarAnimais}>

          <img src='../assets/images/lupa.svg'/>
          </button>
          
        </label>

        <div className='line2' />


        <table>
          <thead>

            <tr>

              <th>Espécie</th>
              <th>Idade</th>
              <th>Sexo</th>
              <th>Dieta</th>


            </tr>

          </thead>
          <tbody>
            {busca.map(item =>

              <tr>

                
                  <td>{item.Sexo}</td>
                  <td>{item.Dieta}</td>
                  <td>{item.Animal}</td>
                  <td>{item.Idade}</td>
                  <td className='btns' style={{ display: 'flex', height: 20 }}>
                      <p onClick={() => AlterarAnimal(item)}>Alterar</p>
                      <p onClick={() => removerAnimal(item.id_animal)}>Remover</p>
                  </td>

                

              </tr>

            )}

          </tbody>

        </table>

      </section>
    </div>
  );
}

export default App;
