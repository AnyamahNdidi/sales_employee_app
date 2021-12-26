import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from './component/Header'
import Todo from './component/Todo';
import {AppProvider} from "./component/Global"
import Test1 from "./component/Test1"
import Register from './component/Register/Register';
import SignIn from './component/Register/SignIn';
import Workspace from './component/screen/Workspace';
import ProjectSpace from './component/screen/ProjectSpace';
import ExploreProject from './component/screen/ExploreProject';
import CreateSteps from './component/screen/CreateSteps';
import Reviews from './component/screen/Reviews';
import PersonalProject from "./component/screen/PersonalProject"


function App() {
  return (
    <AppProvider>
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="" element={<Todo/>}/>
          <Route path="test1" element={<Test1/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="workspace" element={<Workspace/>}/>
          <Route path="project/:id" element={<ProjectSpace/>}/>
          <Route path="explore/:id" element={<ExploreProject/>}/>
          <Route path="steps/:id" element={<CreateSteps/>}/>
          <Route path="sign" element={<SignIn/>}/>
          <Route path="review" element={<Reviews/>}/>
          <Route path="personal" element={<PersonalProject/>}/>
        </Routes>

      </Router>
    </div>
    </AppProvider>
  );
}

export default App;
