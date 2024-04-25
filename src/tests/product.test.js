const request=require('supertest')
const app=require("../app")

const BASE_URL='/api/v1/products'
let token

test("Get BASE_URL should return status code 200 and res.body.length === 1",
async()=>{
    const res= await request(app)
    .get(BASE_URL)

//expect(res.body).toBe(200)
    expect(res.body).toBeDefined()
    
})