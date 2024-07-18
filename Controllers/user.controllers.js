export const GetAllCartProducts = (req, res) => {
    try {
      console.log(req.userId, "req.userId")
      // create model for cart.
      return res.json({ success: true, message: "You are in Cart Page" });
    } catch (error) {
      return res.json({ success: false, error });
    }
  };