import { afterEach, beforeAll, beforeEach, describe, expect, test } from "vitest";
import { config } from "dotenv";
config();

const LOGIN_URL = "https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token";
const API_URL = "https://tokenservice-jwt-2025.fly.dev/movies";

let jwtToken;
let createdMovie;   

function getJWT(){
    beforeAll(async () => {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: import.meta.env.VITE_LOGIN_USERNAME,
                password: import.meta.env.VITE_LOGIN_PASSWORD
            })
        })
    
        jwtToken = await response.text();
    })
}



describe("GET /movies", () => {
    getJWT()
    addMovie()
    cleanUp()
    test("borde returnera status 200 och en array med längd 1", async () => {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });
        

        // 1. Kontrollera status 200
        
        expect(response.status).toBe(200);
        const filmer = await response.json();

        
        // 2. Kontrollera att arrayen har längd 1

        expect(Array.isArray(filmer)).toBe(true);
        expect(filmer.length).toBeGreaterThan(0);

    });
});


    function addMovie(){
    beforeEach(async () => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                "director": "That Fly On The Wall",
                "description": "It's a fly. What more do you expect?",
                "productionYear": 1991,
                "title": "The fly that flew."
            })
        });
    
        createdMovie = await response.json()
    });
}

function cleanUp(){
    afterEach(async () => {
        await fetch(`${API_URL}/${createdMovie.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            }
        });
        createdMovie = null
    });
}

describe("PUT + GET /movies", () => {
    getJWT()
    addMovie()
    cleanUp()

    test("ändra titeln", async () => {
        const newTitle = "ändrad titel!";
        createdMovie.title = newTitle;
        
        const responsePut = await fetch(`${API_URL}/${createdMovie.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createdMovie)
        });

        expect(responsePut.status).toBe(200);

        const responseGet = await fetch(`${API_URL}/${createdMovie.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtToken}`
            },
        });

        expect(responseGet.status).toBe(200);

        const responseGetData = await responseGet.json();

        expect(responseGetData.title).toBe(newTitle);
    });
});


// Detta test behöver läggas in i sin korrekta describe!! Ansvarig kodare får fixa till detta 
// test("GET /movies/{id}", async () => {
//     const response = await fetch(`${API_URL}/${createdMovie.id}`, {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${jwtToken}`
//         }
//     });

//     expect(response.status).toBe(200);

//     const data = await response.json();

//     expect(data.title).toBe(createdMovie.title);
//     expect(data.id).toBe(createdMovie.id);
// });

describe('POST + DELETE /movies', () => {
    getJWT()

    test('namn', async() => {
        // POST Klara
        const response = await fetch(API_URL,{
            method: "POST",
            headers: {
                "Authorization": `Bearer ${jwtToken}`,
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({
                "director": "James Cameron",
                "description": "Giant blue spacemonkeys fight for the right to live on their planet and push out the humans.",
                "productionYear": 2015,
                "title": "Avatar"
            })
        })

        expect(response.status).toBe(201)
        const responseJson = await response.json()

        // DELETE Andreas
        const deleteResponse = await fetch(`${API_URL}/${responseJson.id}`, {
            method: "DELETE",
            headers:  {
                "Authorization": `Bearer ${jwtToken}`
            }
        })
        expect(deleteResponse.status).toBe(204)
    })
})
