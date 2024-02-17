import { Route, Routes} from "react-router-dom";
import Nav from "./components/Navbar/Nav";
import Main from "./components/Main";
import Mac from "./components/pages/Mac";
import Iphone from "./components/pages/Iphone";
import Ipad from "./components/pages/Ipad";
import Watch from "./components/pages/Watch";
import Tv from "./components/pages/Tv";
import Music from "./components/pages/Music";
import Support from "./components/pages/Support";
import Cart from "./components/pages/Cart";
import Four04 from "./components/pages/four04";
import SharedLayout from "./components/SharedLayout";
import Productpage from "./components/pages/Productpage";
function App() {
  return (
    <div>
           <Nav/> 
          <Routes>
            <Route path="/" element={<SharedLayout/>}>
            <Route path="/" element={<Main/>}/>
            <Route path="/mac" element={<Mac/>}/>
            <Route path="/iphone" element={<Iphone/>}/>
            <Route path="/iphone/:product_id" element={<Productpage/>}/>
            <Route path="/ipad" element={<Ipad/>}/>
            <Route path="/watch" element={<Watch/>}/>
            <Route path="/tv" element={<Tv/>}/>
            <Route path="/music" element={<Music/>}/>
            <Route path="/support" element={<Support/>}/>  
            <Route path="/cart" element={<Cart/>}/>
            <Route path="*" element={<Four04/>}/>
            </Route>
          </Routes>
            

    </div>
  );
}

export default App;
