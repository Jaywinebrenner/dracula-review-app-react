
import './App.css';
import Home from './components/Home.js'
import Registration from './components/Registration';

 /* eslint-disable */ 


function App() {
  return (

    <div className="App">
      <div className="title-wrapper">
        <h1 className="app-title">Dracula Review</h1>
        <h2>Find, Rate and Upload Draculas</h2>
        <p>Full CRUD Portfolio piece powered by Ruby on Rails and React</p>
      </div>
      <Registration/>
      <Home/>
    </div>
 
  );
}

export default App;
