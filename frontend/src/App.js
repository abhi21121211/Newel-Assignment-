import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import './App.css';
import ListPage from './ListPage';
import AddEditPage from './AddEditPage';
import ViewPage from './ViewPage';
import { useEffect, useState } from 'react';
import LoginPage from './LoginPage';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('loggedIn') === "true";
    setLoggedIn(userLoggedIn);
  }, [])

  
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* <Route path="/" render={() => ( loggedIn ? <ListPage  handleLogout={handleLogout}/> : <LoginPage handleLogin={handleLogin} />)} />
          <Route path="/add" render={() => ( loggedIn ? <AddEditPage /> : <LoginPage handleLogin={handleLogin} />)} />
          <Route path="/edit/:id" render={() => ( loggedIn ? <AddEditPage /> : <LoginPage handleLogin={handleLogin} />)} />
          <Route path="/view/:id" render={() => ( loggedIn ? <ViewPage /> : <LoginPage handleLogin={handleLogin} />)} /> */}




<Route path="/" element={<LoginPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/add" element={<AddEditPage />} />
          <Route path="/edit/:id" element={<AddEditPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;