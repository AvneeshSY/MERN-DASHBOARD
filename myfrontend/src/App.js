import './component/App.css';
import Nav from './component/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer'
import Signup from './component/signup';
import Privatecomp from './component/private.comp';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<Privatecomp/>}>
          <Route path='/' element= {<ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/Logout' element={<h1>please Logout</h1>} />
          <Route path='/Profile' element={<h1>Customer Profile</h1>} />
          </Route>
          
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />}/>
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
