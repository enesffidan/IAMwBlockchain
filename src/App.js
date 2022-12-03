import logo from './logo.svg';
import './App.css';
import Request from "./helper/request";
import { Button } from '@mui/material';

function App() {

  const handleClick = async () => {
    const resp = await Request("post", "/login", {username: "sa", password: "sa"})
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button onClick={handleClick}>Text</Button>
      </header>
    </div>
  );
}

export default App;
