import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './component/Header'
import Todo from './component/Todo';
import {AppProvider} from "./component/Global"
import Test1 from "./component/Test1"

function App() {
  return (
    <AppProvider>
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="" element={<Todo/>}/>
          <Route path="test1" element={<Test1/>}/>
        </Routes>

      </Router>
    </div>
    </AppProvider>
  );
}

export default App;
