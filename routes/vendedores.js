var express = require('express');
var router = express.Router();
const Vendedor = require("../models/vendedor");

//All vendedores
router.get("/", async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== '' ){
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try{
    const vendedores = await Vendedor.find(searchOptions)
    res.render('vendedores/index' ,{
      vendedores: vendedores,
      searchOptions: req.query 
      })
  }catch{
    res.redirect("/")
  }
  
});

//New Vendedores
router.get("/new", (req, res) => {
  res.render("vendedores/new", { vendedor: new Vendedor() });
});

//Create Vendedor Route
router.post("/",async (req,res)=>{
  const vendedor = new Vendedor({
    name: req.body.name
  })
  try{
    const newVendedor = await vendedor.save()
    res.redirect("vendedores")
  }catch{
    res.render("vendedores/new",{
      vendedor: vendedor,
      errorMessage: "Error creating vendedor"
    })
  }
  

})

module.exports = router;
