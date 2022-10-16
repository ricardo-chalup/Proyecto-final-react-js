import { addDoc, collection, getFirestore } from "firebase/firestore";
import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";
import ItemCart from "../ItemCart";

const Cart = () => {
	const { cart, totalPrice } = useCartContext();

	const order = {
		buyer: {
			name: "Pablo",
			email: "Pablo@gmail.com",
			phone: "123123",
			address: "asdd",
		},
		items: cart.map((product) => ({
			id: product.id,
			title: product.title,
			price: product.price,
			quantity: product.quantity,
		})),
		total: totalPrice(),
	};

	const handleClick = () => {
		const db = getFirestore();
		const ordersCollection = collection(db, "orders");
		addDoc(ordersCollection, order).then(({ id }) => console.log(id));
	};

	if (cart.length === 0) {
		return(
			<div className="carrito__empty p">
			<>
				<p>No hay elementos en el carrito</p>
				<Link to="/">Hacer compras</Link>
			</>
			</div>
		);
	}

	return (
		<>
			{cart.map((product) => (
				<ItemCart key={product.id} product={product} />
			))}
			<p>total: {totalPrice()}</p>
			<button className="btn btn--center" onClick={handleClick}>Emitir compra</button>
		</>
	);
};

export default Cart;
