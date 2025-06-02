import React, { useContext } from "react";
import { CartContext } from "../store/cart-context";

function Cart({ onConfirmOrder }) {
  const { items, removeProduct } = useContext(CartContext);

  let totalPrice = 0;
  if (items.length) {
    totalPrice = items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }

  return (
    <section className="lg:mt-[-80px] lg:basis-[35%] p-[24px] bg-white rounded-[12px]">
      <h2 className="text-[1.5rem] text-custom-red font-bold mb-[24px]">
        Your Cart ({items.reduce((acc, curr) => acc + curr.quantity, 0)})
      </h2>
      {!items.length && (
        <section className="p-[16px]">
          <img
            src="assets/images/illustration-empty-cart.svg"
            alt="empty illustration"
            className="mx-auto mb-[16px]"
          />
          <p className="text-[0.875rem] text-rose-500 font-bold text-center">
            Your added items will appear here
          </p>
        </section>
      )}
      {items.length !== 0 && (
        <section className="">
          <ul className="flex flex-col gap-[16px_0] max-h-[354px] overflow-auto">
            {items.map((item, index) => {
              const { name, price, quantity } = item;
              const fixedPrice = price.toFixed(2);
              const totalItemPrice = Number(quantity) * Number(price);
              const fixedTotalItemPrice = totalItemPrice.toFixed(2);

              return (
                <li key={index} className="last:[&>hr]:hidden">
                  <article className="flex items-center justify-between">
                    <div className="">
                      <h3 className="text-[0.875rem] text-rose-900 font-semibold mb-[8px]">
                        {name}
                      </h3>
                      <p className="flex items-center">
                        <span className="text-[0.875rem] text-custom-red font-bold mr-[8px]">
                          {`${quantity}x`}
                        </span>
                        <span className="text-[0.875rem] text-rose-500 font-normal mr-[8px]">
                          {`@ $${fixedPrice}`}
                        </span>
                        <span className="text-[0.875rem] text-rose-500 font-semibold">
                          {`$${fixedTotalItemPrice}`}
                        </span>
                      </p>
                    </div>
                    <button
                      aria-label={`remove ${name} from cart`}
                      className=" group size-[18px] flex justify-center items-center border border-rose-400 rounded-[999px] transition hover:border-rose-900"
                      onClick={() => removeProduct(index)}
                    >
                      <img
                        src="assets/images/icon-remove-item.svg"
                        alt="close icon"
                        className="group-hover:filter-[brightness(0)_saturate(100%)_invert(10%)_sepia(21%)_saturate(1229%)_hue-rotate(334deg)_brightness(96%)_contrast(106%)]"
                      />
                    </button>
                  </article>
                  <hr className="border-none h-[1px] bg-rose-100 mt-[16px]" />
                </li>
              );
            })}
          </ul>

          <hr className="border-none h-[1px] bg-rose-100 my-[24px]" />

          <section
            aria-labelledby="order-total"
            className="flex items-center justify-between mb-[24px]"
          >
            <h4
              id="order-total"
              className="text-[0.875rem] text-rose-900 font-normal"
            >
              Order Total
            </h4>
            <p>
              <strong className="text-[1.5rem] text-rose-900">{`$${totalPrice.toFixed(
                2
              )}`}</strong>
            </p>
          </section>

          <section aria-label="Delivery Information" className="mb-[24px]">
            <p className="text-[0.875rem] text-rose-900 p-[16px] flex justify-center items-center bg-rose-50 rounded-[8px]">
              <img
                src="assets/images/icon-carbon-neutral.svg"
                alt="icon carbon neutral"
                className="mr-[9.87px]"
              />
              This is a <strong>&nbsp;carbon-neutral&nbsp;</strong>delivery
            </p>
          </section>

          <button
            type="submit"
            className="text-[1rem] text-white font-semibold bg-custom-red w-[100%] h-[53px] rounded-[999px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[100%] after:h-[100%] after:bg-[#000000ff] after:rounded-[999px] after:opacity-0 hover:after:opacity-25 after:transition-opacity duration-300 "
            onClick={() => onConfirmOrder("confirm")}
          >
            <span className="relative z-[1]">Confirm Order</span>
          </button>
        </section>
      )}
    </section>
  );
}

export default Cart;
