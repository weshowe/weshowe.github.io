	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products
// Restriction field indicate whether that restriction allows the product (true) or not (false).		 

var products = [
	{
		name: "Panters Ultra-Peanutty Peanuts",
		nutAllergy: false,
		lactoseIntolerant: true,
		organic: false,
		price: 3.99,
		img: "images/panters.jpg"
	},
	{
		name: "President's Moist 'Dulce de Lecher' Cheesecake",
		nutAllergy: true,
		lactoseIntolerant: false,
		organic: false,
		price: 7.99,
		img: "images/cheesecake.jpg"
	},
	{
		name: "Happy Knife Halal Possum Steaks",
		nutAllergy: true,
		lactoseIntolerant: true,
		organic: false,
		price: 19.99,
		img: "images/possum.jpg"
	},
	{
		name: "Uncle Bill's 'Blindingly Good' Moonshine, 80% ABV",
		nutAllergy: true,
		lactoseIntolerant: true,
		organic: true,
		price: 29.99,
		img: "images/moonshine.jpg"
	},
	{
		name: "Dolthouse Farms Old Tyme Organic Rat Milk",
		nutAllergy: true,
		lactoseIntolerant: false,
		organic: true,
		price: 3.99,
		img: "images/milk.jpg"
	},
	{
		name: "Kentucky Fried Trudeau 'Chicken', 20pc Family Bucket",
		nutAllergy: false,
		lactoseIntolerant: true,
		organic: true,
		price: 24.99,
		img: "images/kft.jpg"
	},
	{
		name: "Zutz Cheese Balls (apologies to the cheese)",
		nutAllergy: true,
		lactoseIntolerant: false,
		organic: false,
		price: 9.99,
		img: "images/zutz.jpg"
	},
	{
		name: "Fat Tim's Maple-Glazed Bacon Donuts, 12 pack",
		nutAllergy: true,
		lactoseIntolerant: false,
		organic: false,
		price: 9.99,
		img: "images/donut.jpg"
	},
	{
		name: "Hippy-Dippy Organic Dip Tobacco",
		nutAllergy: true,
		lactoseIntolerant: true,
		organic: true,
		price: 14.99,
		img: "images/tobacco.jpg"
	},
	{
		name: "Geen Giant Canned Corn, 97% Vitamin Free",
		nutAllergy: true,
		lactoseIntolerant: true,
		organic: false,
		price: 0.99,
		img: "images/corn.jpg"
	},
	{
		name: "Squealin' Piggy's Organic Pork Rinds",
		nutAllergy: true,
		lactoseIntolerant: true,
		organic: true,
		price: 4.99,
		img: "images/porkrinds.jpg"
	},
	{
		name: "Spap: Canned Pork-Like Substance",
		nutAllergy: true,
		lactoseIntolerant: true,
		organic: false,
		price: 3.99,
		img: "images/spam.jpg"
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_ids = [];
	for (let i=0; i<prods.length; i+=1) {

/* Bitwise logic is used to account for multiple restrictions. If a product fails any of the chosen restrictions, it is not added.
Fail condition is a 1 in any of the categories (OR). A restriction can only fail if it is selected for (AND). It will only fail if a given product is not allowed when it is in place (XOR). */	

		if (!(restriction[2] & (restriction[2] ^ prods[i].organic) | restriction[0] & (restriction[0] ^ prods[i].nutAllergy) | restriction[1] & (restriction[1] ^ prods[i].lactoseIntolerant))){
			product_ids.push(i);
		}				
	}
	
	return product_ids;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	
	//Rounds output to 2 decimal places
	return Math.round(totalPrice * 100) / 100;
}
