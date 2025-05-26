import React, { useContext, useEffect, useState } from "react";
import Cart from "./components/Cart";
import Modal from "./components/Modal";
import { CartContext } from "./store/cart-context";

function App() {
  const [products, setProducts] = useState(null);
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);
  const { items, addProduct, incrementQuantity, decrementQuantity } =
    useContext(CartContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("data/data.json"); // lien error when deployed to github /data/data.json
        if (!response.ok) throw new Error("erreur du chargement du fichier");
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleConfirmOrder = (action) => {
    if (action === "confirm") {
      setOrderConfirmed((prev) => (!prev ? true : true));
    }
    if (action === "close") setOrderConfirmed((prev) => (prev ? false : false));
  };

  return (
    <>
      <Modal
        isOrderConfirmed={isOrderConfirmed}
        onConfirmOrder={handleConfirmOrder}
      />
      <main>
        <h1 className="font-bold text-[2.5rem] text-[#260F08] leading-[120%] mb-[32px]">
          Desserts
        </h1>
        <div className="lg:flex lg:gap-[0_32px]">
          <section className="lg:basis-[65%] md:grid md:grid-cols-3 md:gap-6 md:auto-rows-auto">
            {products &&
              products.map((product, index) => {
                const { mobile, desktop, tablet } = product.image;
                const fixedPrice = product.price.toFixed(2);
                const isInCart = items.some(
                  (item) => item.name === product.name
                ); // check if the item is in the cart
                return (
                  <article key={index} className="last:mb-[32px] mb-[24px]">
                    <div
                      className={
                        isInCart
                          ? "rounded-[8px] relative mb-[38px] after:content-[''] after:absolute after:z-[-1] after:top-0 after:left-0 after:w-full after:h-full after:border-[2px] after:rounded-[8px] after:border-custom-red"
                          : "rounded-[8px] relative mb-[38px]"
                      }
                    >
                      <picture className="">
                        <source srcSet={desktop} media="(min-width: 1025px)" />
                        <source srcSet={tablet} media="(min-width: 768px)" />
                        <img
                          src={mobile}
                          alt={product.name}
                          className="rounded-[8px] relative z-[-1]"
                        />
                      </picture>
                      {!isInCart && (
                        <button
                          type="button"
                          className="text-[0.875rem] text-rose-900 font-semibold flex gap-[0_8px] w-[160px] h-[44px] justify-center items-center  rounded-[999px] bg-white absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[50%] border border-rose-400 transition hover:border-custom-red hover:text-custom-red"
                          onClick={() => addProduct(product)}
                        >
                          <img
                            src="assets/images/icon-add-to-cart.svg"
                            alt="cart icon"
                          />
                          Add to Cart
                        </button>
                      )}
                      {isInCart && (
                        <div className="flex justify-between items-center absolute top-[100%] left-1/2 translate-[-50%] bg-custom-red w-[160px] h-[44px] p-[12px] rounded-[999px] ">
                          <button
                            type="button"
                            aria-label={`Decrement ${product.name} Quantity`}
                            className="group flex justify-center items-center border border-white w-[20px] h-[20px] p-[3.75px] rounded-[999px] transition hover:bg-white"
                            onClick={() => decrementQuantity(product.name)}
                          >
                            <img
                              src="assets/images/icon-decrement-quantity.svg"
                              alt="icon decrement"
                              className="group-hover:filter-[brightness(0)_saturate(100%)_invert(24%)_sepia(100%)_saturate(1630%)_hue-rotate(356deg)_brightness(96%)_contrast(94%)]"
                            />
                          </button>
                          <p className="text-[0.875rem] text-white font-semibold ">
                            {items.map((item) => {
                              if (item.name === product.name)
                                return `${item.quantity}`;
                            })}
                          </p>
                          <button
                            type="button"
                            aria-label={`Increment ${product.name} Quantity`}
                            className="group flex justify-center items-center border border-white w-[20px] h-[20px] p-[3.75px] rounded-[999px] transition hover:bg-white"
                            onClick={() => incrementQuantity(product.name)}
                          >
                            <img
                              src="assets/images/icon-increment-quantity.svg"
                              alt="icon increment"
                              className="group-hover:filter-[brightness(0)_saturate(100%)_invert(24%)_sepia(100%)_saturate(1630%)_hue-rotate(356deg)_brightness(96%)_contrast(94%)]"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                    <section>
                      <p className="text-[0.875rem] text-rose-500 font-normal mb-[4px]">
                        {product.category}
                      </p>
                      <h2 className="text-[1rem] text-rose-900 font-semibold mb-[4px]">
                        {product.name}
                      </h2>
                      <p className="text-[1rem] text-custom-red font-semibold">
                        {`$${fixedPrice}`}
                      </p>
                    </section>
                  </article>
                );
              })}
          </section>
          <Cart onConfirmOrder={handleConfirmOrder} />
        </div>
      </main>
    </>
  );
}

export default App;
