import {useEffect, useState, useRef } from 'react'
import "./style.css";
import Trash from "../../assets/lix.png";
import api from '../../services/api'

function Home() {

  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputEmail = useRef()
  const inputMessage = useRef()

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      email: inputEmail.current.value,
      message: inputMessage.current.value
    })

    getUsers()
  }

async function deleteUsers (id){
  await api.delete(`/usuarios/${id}`)

  getUsers()
}

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromApi = await api.get('/usuarios')
      setUsers(usersFromApi.data)
    }
    
    fetchUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Digite seu nome" name="nome" type="text" ref={inputName}/>
        <input placeholder="Digite seu email" name="email" type="email" ref={inputEmail}/>
        <input placeholder="Digite sua mensagem" name="mensagem" type="text" ref={inputMessage}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="card">
          <div className="card-content">
          <p>Nome: <span>{user.name}</span></p>
          <p>Email: <span>{user.email}</span></p>
          <p>Mensagem: <span>{user.message}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)} className="delete-btn">
            <img src={Trash} alt="Delete user" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
