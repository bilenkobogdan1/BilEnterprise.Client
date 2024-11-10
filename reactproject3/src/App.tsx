import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Product } from './table.tsx'
import { StrictMode } from 'react'
import './css/App.css'
import './css/Menu.css'
import './css/TableProduct.css'
import './css/ProductCart.css'
function CreateManu()
{
    const [Allproducts, setProducts] = useState<Product[]>();
    async function populateProductsData() {
        const response = await fetch('https://localhost:7080/api/Product/GetProducts');
        const data = await response.json();
        setProducts(data);
    }
    function Click()
    {
        const menu_button = document.querySelector('.header__burger');
        const menu_itself = document.querySelector('.header__menu');
        const body = document.querySelector('body');
        menu_button!.classList.toggle('active');
        menu_itself!.classList.toggle('active');
        body!.classList.toggle('lock'); 
        populateProductsData();
     }; 
    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <div className="container">
                        <div className="header__body">
                            <a href="#" className="header__logo" onClick={HomeClick}>
                                <img src="https://cdn-icons-png.flaticon.com/512/10725/10725687.png" alt=""/>
                            </a>
                            <div className="header__burger" onClick={Click}>
                                <span></span>
                            </div>
                            <nav className="header__menu">
                                <ul className="header__list" onClick ={Click}>
                                    <li>
                                        <a href="#" className="header__link">Home</a>
                                    </li>
                                    <li onClick={() => CreateTableProd(Allproducts!)}>
                                        <a href="#" className="header__link">Products</a>
                                    </li>
                                    <li>
                                        <a href="#" className="header__link">Shop</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        </>
 
  )
}
function HomeClick()
{
    createRoot(document.getElementById("TableProduct")!).render(<></>)
}
function CreateTableProd(date: Product[]) {
    //async function populateWeatherData() {
    //    const response = await fetch('weatherforecast');
    //    const data = await response.json();
    //    setForecasts(data);
    //}
    //  const [count1, setCount1] = useState(0)
    console.log(date);

    function Click(kmat: string)
    {

        function BlockProductCart()
        {
           // alert("block");
            document.getElementById("product")!.style.display = "none";
        }
        //alert(kmat);
        const productCart = date.filter(x => x.kmat === kmat)[0]
     //   alert(productCart.link);
       // document.getElementById("product")!.style.display = "block";
        createRoot(document.getElementById("ProductCart")!).render(
            <>
                <div className="product-card" id="product">
                    <span className="product-catagory" onClick={BlockProductCart}> Close </span>
                    <div className="product-tumb">
                        <img src={productCart.link} alt=""/>
                    </div>
                    <div className="product-details">
                        <h4> {productCart.name} </h4>
                        <p>{productCart.description}</p>
                        <div className="product-bottom-details">
                            <div className="product-price"><small>$96.00</small>{ productCart.price}</div>
                            <div className="product-links">
                                <a href=""><i className="fa fa-heart"></i></a>
                                <a href=""><i className="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    createRoot(document.getElementById("TableProduct")!).render(
        <>
            <table> 
                <thead>
                    <tr>
                        <th scope="col"> Code </th>
                        <th scope="col"> Name </th>
                        <th scope="col"> Description </th>
                        <th scope="col"> Data </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        date.map(d =>

                            <tr key={d.kmat} onClick={() => Click(d.kmat)}>
                                <td>{d.kmat}</td>
                                <td>{d.name}</td>
                                <td> {d.description}</td>
                                <td> {d.articule}</td>
                             </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}



function App() {
  const [count, setCount] = useState(0)
  return (
      <>
          <StrictMode>
              <CreateManu />
          </StrictMode>,
          <div id="ProductCart"></div>
          <div id = "TableProduct"> </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
          </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
          </p>
          <div className="Hi">
          </div>
    </>
  )
}

export default App
