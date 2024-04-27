require('../models')
const request=require("supertest")
const app=require('../app')
const User = require("../models/User")
const Product = require("../models/Product")

const base_url='/api/v1/cart'
let user
let product
let token
let cart
let cartId
beforeAll(async()=>{
     //creamos login dentro del hooks
  const userio={
    email: "daniloomarmontecel@gmail.com",
    password: "danilo1234",
  }
  //ejecutamos el endpoint de login
  const res= await request(app)
  .post('/api/v1/users/login').send(userio)

  token=res.body.token
    //asignamos User
  user = await User.create({
    firstName:"Jose",
    lastName:"Ramirez",
    email:"jose@hotmail.com",
    password:"1234",
    phone:"8484849s"
  })
  product= await Product.create({ title:"Celular",
  description:"telefono 13 269gb",
  price:400})
})
test("Post base_url should status code 201, and res.body.quantity===cart.quantity",
async()=>{
    cart={
        quantity:"400",
        userId:user.id,
        ProductId:product.id
        //creamos los hooks
    }
    const res= await request(app)
       .post(base_url)
       .send(cart)
       .set('Authorization',`Bearer ${token}`)
    //console.log(res.body)
       cartId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)

    
})
test("Get base_url should return status code 200 and res.body===1",
async()=>{
    const res = await request(app)
      .get(base_url)
      .set('Authorization',`Bearer ${token}`)
      //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    await user.destroy() 
    await product.destroy()
    
})