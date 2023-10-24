import './App.css'
import { Container } from './Container'
import { Footer } from './Footer'
import { Header } from './Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<Header/>
			<Container/>
			<Footer/>
			<ToastContainer />
		</>
	)
}

export default App
