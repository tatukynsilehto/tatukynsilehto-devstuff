import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello world
        </h1>
        <div className="button-container">
          <Link to="/app1">
            <button className="app-button">
              Open App 1
            </button>
          </Link>
          <button className="app-button" onClick={() => alert('App 2')}>
            Open App 2
          </button>
          <button className="app-button" onClick={() => alert('App 3')}>
            Open App 3
          </button>
          <button className="app-button" onClick={() => alert('App 4')}>
            Open App 4
          </button>
        </div>
      </header>
    </div>
  );
}

export default Home;