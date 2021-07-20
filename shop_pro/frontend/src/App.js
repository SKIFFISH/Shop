import Header from "./Component/Header";
import Home from "./Pages/Home";
import './style/layout.scss'
import 'antd/dist/antd.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
        <Header />
          <Route exact path='/' component={Home}/>
          <Route path='/product/:id' component={Product} />
          <Route path='/cart' component={Cart} /> 
    </Router>
  );
}

export default App;
