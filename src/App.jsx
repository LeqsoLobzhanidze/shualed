import { useState } from 'react';
import './App.css';

function App() {
  const images = ['1.png', '2.png', '3.png'];
  const [mainImg, setMainimg] = useState(images[0]);
  const [secImg, setSecimg] = useState(mainImg);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [count2, setCount2] = useState(1);
  const [cart, setCart] = useState([]);

  const nextHandler = () => {
    const nextIndex = (count + 1) % images.length;
    setCount(nextIndex);
    setSecimg(images[nextIndex]);
  };

  const prevHandler = () => {
    const prevIndex = (count - 1 + images.length) % images.length;
    setCount(prevIndex);
    setSecimg(images[prevIndex]);
  };

  const handleAddToCart = () => {
    const cartInfo = {
      id: Date.now(), 
      title: 'shoe',
      desc: 'nice shoe',
      price: 125,
      total: 125 * count2,
      img: `/assets/${mainImg}`
    };
    setCart([...cart, cartInfo]);
  };

  const handleDelete = (id) => {
    setCart(cart.filter(el => el.id !== id));
  };

  return (
    <div className="App">
      <header>
        <h1>Product Gallery</h1>
        <div className="cart">
          {cart.length > 0 && (
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt="" width={50} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <p>Price: ${item.price}</p>
                    <p>Total: ${item.total}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      <img src={`/assets/${mainImg}`} alt="" width={500} onClick={() => setShow(true)} className="main-image" />

      <div className="thumbnails">
        {images.map(el => (
          <img
            onClick={() => { setMainimg(el); setSecimg(el); }}
            key={el}
            src={`/assets/${el}`}
            width={100}
            alt=""
            className={el === mainImg ? 'active' : ''}
          />
        ))}
      </div>

      {show && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShow(false)}>X</button>
            <button onClick={prevHandler}>Prev</button>
            <img src={`/assets/${secImg}`} alt="" width={500} />
            <button onClick={nextHandler}>Next</button>
            <div className="modal-thumbnails">
              {images.map(el => (
                <img onClick={() => setSecimg(el)} key={el} src={`/assets/${el}`} width={100} alt="" />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="quantity-controls">
        <button onClick={() => count2 > 1 && setCount2(count2 - 1)}>-</button>
        <span>{count2}</span>
        <button onClick={() => setCount2(count2 + 1)}>+</button>
      </div>
      <button onClick={handleAddToCart} className="add-to-cart">Add to Cart</button>
    </div>
  );
}

export default App;
