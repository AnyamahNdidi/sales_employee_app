import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './component/Header'
import Todo from './component/Todo';

function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="" element={<Todo/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
