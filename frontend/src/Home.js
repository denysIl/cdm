import logo from './logo.png';
import './App.css';
import SearchBar from './js/components/SearchBar'

// homepage showing the search bar
function App() {
  return (
    <div>
      <img src={logo} alt="Logo" style={{width: '10vw', margin: '2em'}} />
      <div class='App-header'>
        <h1 style= {{margin: 5}}>Access to Justice Librarian</h1>
        <p style= {{fontSize: '.6em', margin: 10}}>Quickly capture legal insights that is right for you</p>
        <SearchBar />
      </div>
    </div>
  )
}

export default App;
