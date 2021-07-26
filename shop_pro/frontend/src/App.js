import Header from "./Component/Header";
import Home from "./Pages/Home";
import './style/layout.scss'
import 'antd/dist/antd.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Regist from "./Pages/Regist";
import Shipping from "./Pages/Shipping";
import Payment from "./Pages/Payment";
import Order from "./Pages/Order";
import OrderPay from "./Pages/OrderPay";
import Profile from "./Pages/Profile";
import AllUser from "./Pages/AllUser";
import AllProducts from "./Pages/AllProducts";
import EditProduct from "./Pages/EditProduct";

function App() {
  return (
    <Router>
        <Header/>
          <Route exact path='/' component={Home} />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/regist' component={Regist} />
          <Route path ='/shipping' component ={Shipping} />
          <Route path ='/payment' component ={Payment} />
          <Route path ='/order' component ={Order} exact/>
          <Route path ='/order/:id' component ={OrderPay} />
          <Route path ='/profile' component ={Profile} />
          <Route path ='/allusers' component={AllUser} />
          <Route path='/allproducts' component ={AllProducts} />
          <Route path='/admin/product/:id/edit' component={EditProduct} />
    </Router>
  );
}

export default App;
