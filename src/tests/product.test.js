require("../models")
const request=require('supertest')
const app=require("../app")
const Category = require('../models/Category')

const BASE_URL='/api/v1/products'
let token
let productId
let product
let category //declaramos category con let
//creando un hooks de categoria para el test
beforeAll(async()=>{
  //creamos login dentro del hooks
  const user={
    email: "daniloomarmontecel@gmail.com",
    password: "danilo1234",
  }
  //ejecutamos el endpoint de login
  const res= await request(app)
  .post('/api/v1/users/login').send(user)

  token=res.body.token
  //asignamos category
  category=await Category.create({name:'tecno'})
})
test("Post BASE_URL, should return status code 201, and res.body.title===products.title",
async()=>{
  product={
    title:"Celular",
    description:"telefono 13 269gb",
    price:400,
    categoryId:category.id //utlizamos category
    //Creamos un hooks de categoria
  }
  //creamos product 
  const res= await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization',`Bearer ${token}`)//es neceario hacer login antes de crear un producto
    productId = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)
 
})
test("Get BASE_URL should return status code 200 and res.body === 1",
async()=>{

    const res = await request(app)
      .get(BASE_URL)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  
    
})
test("Get BASE_URL/:id should return status code 201, and res.body.length===1",
async()=>{
  const res= await request(app)
    .get(`${BASE_URL}/${productId}`)
   // console.log(res.body);
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)


})
test("Put BASE_URL should return status code 200, and res.body.title===updateBody.title",
async()=>{
  const updateBody={
    title:"Televisor"
  }
  const res= await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(updateBody)
    .set('Authorization',`Bearer ${token}`)
//console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(updateBody.title)
   
})
test("Delete BASE_URL should return status code 204",
async()=>{
  const res= await request(app)
  .delete(`${BASE_URL}/${productId}`)
  .set('Authorization',`Bearer ${token}`)
  expect(res.status).toBe(204)

 await category.destroy()
})