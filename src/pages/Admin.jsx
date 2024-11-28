import { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // requisicao get
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/list');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // metodo post
  const handleCreateUser = async () => {
    if (username && password) {
      const newUser = { username, password };
      try {
        await fetch('http://localhost:8080/user/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        fetchUsers(); // Atualiza a lista de usuários
        setUsername('');
        setPassword('');
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
      }
    } else {
      alert("Por favor, insira o nome de usuário e a senha.");
    }
  };

  // metodo delete
  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8080/user/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>To-Do-List Admin</h1>

      <div>
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleCreateUser}>Criar Usuário</button>
      </div>

      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.username}>
            <span className="username">{user.username}</span>
            <button onClick={() => handleDeleteUser(user.username)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;