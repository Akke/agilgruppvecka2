import { beforeAll, describe, expect, test } from "vitest";

const LOGIN_URL = "https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token";
const API_URL = "https://tokenservice-jwt-2025.fly.dev/movies";
let jwtToken;

beforeAll(async () => {
    const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: "axel",
            password: "123456789"
        })
    })

    jwtToken = await response.text();
});


describe("GET /movies", () => {
    test("borde returnera status 200 och en array med längd 1", async () => {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Autorization": `Bearer ${jwtToken}`
            }
        });
        

        // 1. Kontrollera status 200
        
        expect(response.status).toBe(200);
        const filmer = await response.json();

        
        // 2. Kontrollera att arrayen har längd 1

        expect(Array.isArray(filmer)).toBe(true);
        expect(filmer.length).toBe(1);

    });
});


    