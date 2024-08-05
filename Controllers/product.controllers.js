import Admin from "../Models/admin.model.js";
import Product from "../Models/product.model.js";

export const GetAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    return res.json({ error, success: false });
  }
};
export const CreateNewProduct = async (req, res) => {
  try {
    const { name, price, category, quantity, image } = req.body.productData;
    const { userId } = req.body;
    if (!name || !price || !category || !quantity || !image || !userId) {
      return res.json({ success: false, error: "All fields are required." });
    }
    // const isIdofAdmin= await Admin.findById(userId);
    // if(!isIdofAdmin){
    //   return res.json({ success: false, error: "Not allowed to add the product." });

    // }
    const isProductExist = await Product.findOne({
      name,
      category,
      creatorid: userId,
    });
    if (isProductExist) {
      return res.json({ success: false, error: "Product is already exists." });
    }

    const newProduct = new Product({
      name: name,
      price: price,
      category,
      quantity,
      image,
      creatorid: userId,
    });
    await newProduct.save();

    return res.json({
      success: true,
      message: "Product successfully created.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};

export const GetSingleProducts = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log(productId, " product id");
    if (!productId) {
      return res.json({ success: false, error: "Product id required" });
    }
    const product = await Product.findById(productId);
    return res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.json({ error, success: false });
  }
};

export const filter = async (req, res) => {
  try {
    const { price, price1,category } = req.body;
    if (!price) {
      return res.json({ success: false, error: "Price is required" });
    }
    // const filteredProducts= await Product.find({price: {$eq: price} })
    // const filteredProducts= await Product.find({price: {$ne: price} })
    // const filteredProducts= await Product.find({price: {$gt: price} })
    // const filteredProducts= await Product.find({price: {$gte: price} })
    // const filteredProducts= await Product.find({price: {$lt: price} })
    // const filteredProducts= await Product.find({price: {$lte: price} })
    // const filteredProducts= await Product.find({price: {$in: [price, price1]} })
    // const filteredProducts = await Product.find({
    //   $and: [{ price: { $gt: 1200 } }, { quantity: { $gte: 2 } }],
    // });

    //  const filteredProducts = await Product.find({
    //   $or: [{ price: { $gt: 1200 } }, { quantity: { $gte: 2 } }],
    // });

    // const filteredProducts = await Product.find({
    //   $nor: [{ price: { $gt: 1200 } }, { quantity: { $gte: 2 } }],
    // });

      // const filteredProducts= await Product.find({category: {$not: {$eq: category}} })
      
      // const filteredProducts= await Product.find({image: {$exists: true} })

      const filteredProducts= await Product.find({price: {$type: "number"} })



    return res.json({ success: true, products: filteredProducts });
  } catch (error) {
    console.log(error);
    return res.json({ error: error, success: false });
  }
};

export const agPipeline = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: { price: { $gt: 1100 }, quantity: { $lt: 2 } } },
      // { $match: { $or: [{price: { $gt: 500 }}, {quantity: { $lte: 1 } }]} },
      {
        $group: {
          _id: "$category",
          totalQuantity: { $sum: "$quantity" },
          totalPrice: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    return res.json({ products });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};


export const agUnwinding = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $unwind: "$tags" },
      // { $project: { name: 1, tags:1} },
      { $project: { creatorid: 0, quantity:0, image:0 } },
    ]);
    res.json({ success: true, products });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};

export const search = async (req, res) => {
  try {
    const { searchedWord, searchedWord1, searchedWord2 } = req.body;
    const products = await Product.find({

      // {name: { $regex: searchedWord , $options: "i"}}, 
      $or:[
      {name: { $regex: searchedWord , $options: "i"}}, 
      {tags: { $regex: searchedWord1 , $options: "i"}},
      {category: { $regex: searchedWord2 , $options: "i"}}
    ],
     });

    res.json({ success: true, products });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};

export const range = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
  const products = await Product.find({
  $and:  [{ price: { $gte: minPrice}},{ price: { $lte: maxPrice}}],
  });
  console.log(products, "products")
    res.json({ success: true, products });
  } catch (error) {
    return res.json({ error, success: false });
  }
};