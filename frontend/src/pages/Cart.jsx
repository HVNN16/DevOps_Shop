import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart } = useCart();

  return (
    <section className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        cart.map((item, i) => <p key={i}>{item.name}</p>)
      )}
    </section>
  );
}
