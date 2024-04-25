const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'

let TOKEN
let userId

beforeAll(async () => {

  const user = {
    email: "daniloomarmontecel@gmail.com",
    password: "danilo1234"
  }

  const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

  // console.log(res.body.token);
  TOKEN = res.body.token
})


test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {
  const user = {
    firstName: "Maicol",
    lastName: "Salazar",
    email: "maicol@gmail.com",
    password: "maicol1234",
    phone: "1234"
  }

  const res = await request(app)
    .post(BASE_URL)
    .send(user)


  userId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})
test("Put -> 'BASE_URL/:id', should return status code 200,  res.body.lastName === userUpdate.lastName",
async()=>{
    const userUpdate={
        lastName:"Jose"
    }
    const res =await request (app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.lastName).toBe(userUpdate.lastName)
})
//para logearme utilizo post rutas dinamicas
test("Post 'BASE_URL/login' should return statu code 200, res.body.user.email === user.email and res.body.token to be defined ",
async()=>{
  const user={
    email: "daniloomarmontecel@gmail.com",
    password: "danilo1234"
  }
  const res =await request (app)
  .post(`${BASE_URL}/login`)
  .send(user)
 
  
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.user.email).toBe(user.email)
  expect(res.body.token).toBeDefined()
})
test("Post BASE_URL/login should return status code 401 ",
async ()=>{
  const userinvalid={
    email:"ron@gmail.com",
    password:"8484h"
  }
  const res= await request(app)
  .post(`${BASE_URL}/login`)
  .send(userinvalid)
  expect(res.status).toBe(401)

})
test("Delete BASE_URL/id, should return status code 204 ",
async ()=>{
  const res = await request(app)
  .delete(`${BASE_URL}/${userId}`)
  .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)
})