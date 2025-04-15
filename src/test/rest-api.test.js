import { beforeAll, describe, expect, test } from "vitest";
import { config } from "dotenv";
config();

const LOGIN_URL = "https://tokenservice-jwt-2025.fly.dev/token-service/v1/request-token";
const API_URL = "https://tokenservice-jwt-2025.fly.dev/movies";
let jwtToken;

beforeAll(async () => {
    console.log(import.meta.env.VITE_LOGIN_PASSWORD)
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
});

