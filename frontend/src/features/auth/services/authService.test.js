import {
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import axios from "axios";

import {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
} from "./authService";


vi.mock("axios");


describe("authService", () => {

    const mockPost = vi.fn();

    const mockGet = vi.fn();


    beforeEach(() => {

        vi.clearAllMocks();

        localStorage.clear();

        axios.create.mockReturnValue({
            post: mockPost,
            get: mockGet,
            interceptors: {
                request: {
                    use: vi.fn(),
                },
                response: {
                    use: vi.fn(),
                },
            },
        });

    });


    it("loginUser calls login API", async () => {

        mockPost.mockResolvedValueOnce({
            data: {
                access_token: "test-token",
                token_type: "bearer",
            },
        });

        const result = await loginUser({
            email: "louis@example.com",
            password: "password123",
        });

        expect(mockPost).toHaveBeenCalledWith(
            "/auth/login",
            {
                email: "louis@example.com",
                password: "password123",
            }
        );

        expect(
            result.access_token
        ).toBe("test-token");

    });


    it("registerUser calls register API", async () => {

        mockPost.mockResolvedValueOnce({
            data: {
                id: 1,
                username: "louis",
            },
        });

        const result = await registerUser({
            username: "louis",
            email: "louis@example.com",
            password: "password123",
        });

        expect(mockPost).toHaveBeenCalledWith(
            "/auth/register",
            {
                username: "louis",
                email: "louis@example.com",
                password: "password123",
            }
        );

        expect(
            result.username
        ).toBe("louis");

    });


    it("getCurrentUser calls users me API", async () => {

        mockGet.mockResolvedValueOnce({
            data: {
                id: 1,
                username: "louis",
                email: "louis@example.com",
            },
        });

        const result =
            await getCurrentUser();

        expect(mockGet).toHaveBeenCalledWith(
            "/users/me"
        );

        expect(
            result.email
        ).toBe("louis@example.com");

    });


    it("logoutUser removes access token", () => {

        localStorage.setItem(
            "access_token",
            "test-token"
        );

        logoutUser();

        expect(
            localStorage.getItem(
                "access_token"
            )
        ).toBeNull();

    });

});