import logo from './logo.svg';
import './App.css';
import Home from './Home'
import Results from './Results'
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
          {/* <Route index element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  )
  // return (
  //   <div class='App-header'>
  //     <h1 style= {{margin: 5}}>Access to Justice Librarian</h1>
  //     <p style= {{fontSize: '.6em', margin: 5}}>Quickly capture legal insights that is right for you</p>
  //     <SearchBar />
  //     </div>
  // )
}

export default App;
