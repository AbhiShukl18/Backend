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
    const { name, price, category, quantity, image, } = req.body.productData;
    const {userId}=req.body
    if (!name || !price || !category || !quantity || !image || !userId ) {
      return res.json({ success: false, error: "All fields are required." });
    }
    // const isIdofAdmin= await Admin.findById(userId);
    // if(!isIdofAdmin){
    //   return res.json({ success: false, error: "Not allowed to add the product." });


    // }
    const isProductExist = await Product.findOne({ name, category, creatorid:userId, });
    if (isProductExist) {
      return res.json({ success: false, error: "Product is already exists." });
    }

    const newProduct = new Product({
      name: name,
      price: price,
      category,
      quantity,
      image,
      creatorid:userId,
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

export const GetSingleProducts = async (req,res)=>{

  try{
const { productId}=req.body;
console.log(productId," product id")
if(!productId){

  return res.json({success:false, error: "Product id required"})
}
const product= await Product.findById(productId)
return res.json({success:true, product})
  }

  catch(error)
  {
    console.log(error)
    return res.json({error, success:false});
  }
}