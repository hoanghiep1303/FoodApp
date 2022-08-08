const Product = require('../models/Product');
const fs = require('fs');
var paypal = require('paypal-rest-sdk');

exports.checkout = async (req,res) =>{
	const CILENT_ID_PP = "Ab9ADnUFlhhvW_yM_7RakcfMJ3LoVD9k7BAP4DM2EpaYG8OYVzSrM92z59FZ4VlSkSzzDF-2H9k4KEuV"
	const CILENT_SECRET_PP = "EEIpWJBixDOxpOqEreH5csgxM8SOunzVCq40fM_yAkdAW8M5wHDg4u1fZT1iVQdPkL_VbhTB3Vkukdrn"
	paypal.configure({
		'mode': 'sandbox',
		'client_id': CILENT_ID_PP,
		'client_secret': CILENT_SECRET_PP
	})

	const { userId, money, address } = req.body

	var create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": "http://localhost:3000/api/product/checkout-success",
			"cancel_url": "http://localhost:3000/api/product/checkout-error"
		},
		"transactions": [{
			"item_list": {
				"items": [{
					"name": "item",
					"sku": "item",
					"price": money,
					"currency": "USD",
					"quantity": 1
				}]
			},
			"amount": {
				"currency": "USD",
				"total": money
			},
			"description": "Payment for FoodApp."
		}]
	};

	paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
			throw error;
		} else {
			for(let i = 0; i < payment.links.length; i++) {
				if(payment.links[i].rel === 'approval_url'){
					res.redirect(payment.links[i].href);
				}
			}
		}
	});

}

exports.checkoutSuccess = async (req, res) => {
	res.status({msg: "Success!"})
}
exports.checkoutFail = async (req, res) => {
	res.status({msg: "Failed!"})
}

exports.create = async (req, res) => {
	const { filename } = req.file;
	const {
		productName,
		productDesc,
		productPrice,
		productCategory,
		productQty,
	} = req.body;

	try {
		let product = new Product();
		product.fileName = filename;
		product.productName = productName;
		product.productDesc = productDesc;
		product.productPrice = productPrice;
		product.productCategory = productCategory;
		product.productQty = productQty;

		await product.save();

		res.json({
			successMessage: `${productName} was created`,
			product,
		});
	} catch (err) {
		console.log(err, 'productController.create error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readAll = async (req, res) => {
	try {
		const products = await Product.find({}).populate(
			'productCategory',
			'category'
		);

		res.json({ products });
	} catch (err) {
		console.log(err, 'productController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readByCount = async (req, res) => {
	try {
		const products = await Product.find({})
			.populate('productCategory', 'category')
			.limit(8);

		res.json({ products });
	} catch (err) {
		console.log(err, 'productController.readAll error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.read = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);

		res.json(product);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.update = async (req, res) => {
	const productId = req.params.productId;

	if (req.file !== undefined) {
		req.body.fileName = req.file.filename;
	}

	const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

	if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
		fs.unlink(`uploads/${oldProduct.fileName}`, err => {
			if (err) throw err;
			console.log('Image deleted from the filesystem');
		});
	}

	res.json({
		successMessage: 'Product successfully updated',
	});
};

exports.delete = async (req, res) => {
	try {
		const productId = req.params.productId;
		const deletedProduct = await Product.findByIdAndDelete(productId);

		fs.unlink(`uploads/${deletedProduct.fileName}`, err => {
			if (err) throw err;
			console.log(
				'Image successfully deleted from filesystem: ',
				deletedProduct.fileName
			);
		});

		res.json(deletedProduct);
	} catch (err) {
		console.log(err, 'productController.delete error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};