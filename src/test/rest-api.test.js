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
