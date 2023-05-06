import './App.css';
import Routes from './routes';
import Global from './styles/global';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Global />
      <ToastContainer 
        autoClose={3000}/>
      <Routes />
    </>
  );
}

export default App;
