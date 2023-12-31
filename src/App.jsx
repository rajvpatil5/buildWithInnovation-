import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { selectCurrentUser } from './redux/user/user.selector';

function App() {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    );
  }

  if (currentUser) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </>
    );
  }
}

export default App;

