const request=require('supertest')
const app=require("../app")

const BASE_URL=('/api/v1/categories')
let token

let categoryId

//hook de inicio de sesion
beforeAll(async () => {
  const user = {
    email: "daniloomarmontecel@gmail.com",
    password: "danilo1234"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  token = res.body.token
})
test("Post BASE_URL, should return status code 201, res.body.name===categori.name ",
async()=>{
    const categori={
        name:"Electronica"
    }
    const res= await request(app)
    .post(BASE_URL)
    .send(categori)
    .set("Authorization", `Bearer ${token}`)

    categoryId=res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(categori.name)
})
test("Get 'BASE_URL' should return status code 200 and res.body.length === 1 ",
async() =>{
   // token=res.body.token
    const res = await request(app)
    .get(BASE_URL)
   // .set('Authorization', `Bearer ${token}`)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)
})
test("Delete BASE_URL/:id, should return status code 204 ",
async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(204)

    
})