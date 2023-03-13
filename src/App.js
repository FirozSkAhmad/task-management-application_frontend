import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './Components/Login';
import Register from "./Components/Register";
import Home from './Components/Home';
import AddTask from './Components/AddTask';
import Protucted from './Components/Protucted';
import UpdateTask from './Components/UpdateTask';
import CompletedTasks from './Components/CompletedTasks'
import TaskNSettings from './Components/TaskNSettings'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Protucted Component={Login} />} />
          <Route path='/register' element={<Protucted Component={Register} />} />
          <Route path='/addTask' element={<Protucted Component={AddTask} />} />
          <Route path='/completedTasks' element={<Protucted Component={CompletedTasks} />} />
          <Route path='/updateTask/:Id' element={<Protucted Component={UpdateTask} />} />
          <Route path='/TaskNSettings/:Id' element={<Protucted Component={TaskNSettings} />} />
          <Route path='/' element={<Protucted Component={Home} />} />
          <Route path='/*' element={<Navigate to="/register" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;