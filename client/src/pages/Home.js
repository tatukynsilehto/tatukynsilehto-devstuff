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
          <Link to="/app2">
            <button className="app-button">
              Open App 2
            </button>
          </Link>
          <Link to="/app3">
            <button className="app-button">
              Open App 3
            </button>
          </Link>
          <Link to="/app4">
            <button className="app-button">
              Open App 4
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;