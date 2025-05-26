import React, { useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/cart-context";

function Modal({ isOrderConfirmed, onConfirmOrder }) {
  const { items, removeAll } = useContext(CartContext);
  const dialogRef = useRef();

  const handleCloseModal = () => {
    onConfirmOrder("close"); // set cofirm order to false then close the modal
    removeAll(); // remove all items in cart
  };

  const handleClickedTarget = (event) => {
    if (event.target.tagName === "DIALOG") {
      // onConfirmOrder("close");
    }
  };

  if (isOrderConfirmed) {
    if (dialogRef.current) dialogRef.current.showModal();
  }

  if (isOrderConfirmed === false) {
    if (dialogRef.current) dialogRef.current.close();
  }

  let totalPrice = 0;
  if (items.length) {
    totalPrice = items.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
  }
  return createPortal(
    <dialog
      ref={dialogRef}
      className="backdrop:bg-[#00000080]"
      onClick={(event) => handleClickedTarget(event)}
    >
      <div className="flex flex-col fixed left-0 bottom-0 w-full h-[calc(100%-95px)] outline-none bg-white rounded-t-[12px] p-[40px_24px_24px_24px] md:p-[40px] md:rounded-[12px] md:left-1/2 md:translate-x-[-50%] md:bottom-auto md:w-[calc(100%-80px)] md:top-1/2 md:translate-y-[-50%] md:max-w-[700px]">
        <header>
          <img
            aria-hidden="true"
            src="assets/images/icon-order-confirmed.svg"
            alt="icon order confirmed"
            className="mb-[24px]"
          ></img>
          <h2 className="text-[2.5rem] text-rose-900 font-bold leading-[120%] mb-[8px]">
            <span className="block md:inline">Order&nbsp;</span>
            <span>Confirmed</span>
          </h2>
          <p className="text-[1rem] text-rose-500 font-normal mb-[32px]">
            We hope you enjoy your food!
          </p>
        </header>

        <section
          aria-label="Order Summary"
          className="bg-rose-50 rounded-[8px] p-[24px] mb-[32px]"
        >
          <ul className="max-h-[354px] overflow-auto">
            {items.map((item, index) => {
              const { thumbnail } = item.image;
              const { name, price, quantity } = item;
              const fixedPrice = price.toFixed(2);
              const totalItemPrice = Number(quantity) * Number(price);
              const fixedTotalItemPrice = totalItemPrice.toFixed(2);

              return (
                <li
                  key={index}
                  className="last:[&>hr]:mt-[24px] pt-[16px] first:pt-0"
                >
                  <article className="flex items-center">
                    <img
                      src={thumbnail}
                      alt={name}
                      className="rounded-[4px] size-[48px] mr-[16px]"
                    />
                    <div className="flex flex-col mr-auto">
                      <h3 className="text-[14px] text-rose-900 font-semibold">
                        Classic Tiramisu
                      </h3>
                      <p className="">
                        <span className="text-[0.875rem] text-custom-red font-bold mr-[8px]">
                          {`${item.quantity}x`}
                        </span>
                        <span className="text-[0.875rem] text-rose-500 font-normal">{`$${fixedPrice}`}</span>
                      </p>
                    </div>
                    <p className="text-[1rem] text-rose-900 font-semibold">
                      {`$${fixedTotalItemPrice}`}
                    </p>
                  </article>
                  <hr className="border-none h-[1px] bg-rose-100 mt-[16px]" />
                </li>
              );
            })}
          </ul>
          <section className="flex justify-between mt-[24px]">
            <p className="text-[0.875rem] text-rose-900">Order Total</p>
            <p className="text-[1.5rem] text-rose-900 font-bold">
              <strong>{`$${totalPrice.toFixed(2)}`}</strong>
            </p>
          </section>
        </section>
        <button
          type="submit"
          className="text-[1rem] text-white font-semibold bg-custom-red w-[100%] min-h-[53px] rounded-[999px] relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-[100%] after:h-[100%] after:bg-[#000000ff] after:rounded-[999px] after:opacity-0 hover:after:opacity-25 after:transition-opacity duration-300 mt-auto"
          onClick={() => handleCloseModal()}
        >
          Start New Order
        </button>
      </div>
    </dialog>,
    document.querySelector(".modal__container")
  );
}

export default Modal;
