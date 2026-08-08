import {
    describe,
    expect,
    it,
    vi,
} from "vitest";

import {
    render,
    screen,
    waitFor,
} from "@testing-library/react";


import {
    AuthProvider,
    useAuthContext,
} from "./AuthContext";


const mockGetCurrentUser =
    vi.fn();

const mockLogoutUser =
    vi.fn();


vi.mock(
    "../services/authService",
    () => ({
        getCurrentUser:
            mockGetCurrentUser,

        logoutUser:
            mockLogoutUser,
    })
);


function TestComponent() {

    const {
        user,
        loading,
        isAuthenticated,
    } = useAuthContext();


    if (loading) {

        return (
            <div>
                loading
            </div>
        );
    }


    return (
        <div>

            <span>
                {isAuthenticated
                    ? "authenticated"
                    : "unauthenticated"}
            </span>

            <span>
                {user?.username}
            </span>

        </div>
    );
}


describe("AuthContext", () => {

    it("is unauthenticated without token", async () => {

        localStorage.clear();

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {

            expect(
                screen.getByText(
                    "unauthenticated"
                )
            ).toBeInTheDocument();

        });

        expect(
            mockGetCurrentUser
        ).not.toHaveBeenCalled();

    });


    it("loads authenticated user", async () => {

        localStorage.setItem(
            "access_token",
            "valid-token"
        );

        mockGetCurrentUser.mockResolvedValueOnce({
            id: 1,
            username: "louis",
            email: "louis@example.com",
        });

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {

            expect(
                screen.getByText(
                    "authenticated"
                )
            ).toBeInTheDocument();

        });

        expect(
            screen.getByText("louis")
        ).toBeInTheDocument();

    });


    it("clears auth when token is invalid", async () => {

        localStorage.setItem(
            "access_token",
            "invalid-token"
        );

        mockGetCurrentUser.mockRejectedValueOnce(
            new Error("Unauthorized")
        );

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {

            expect(
                screen.getByText(
                    "unauthenticated"
                )
            ).toBeInTheDocument();

        });

        expect(
            mockLogoutUser
        ).toHaveBeenCalled();

    });

});