import { describe, expect, it, vi } from "vitest";
import {
    render,
    screen,
    waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";


const mockLogin = vi.fn();


vi.mock(
    "../../auth/hooks/useAuth",
    () => ({
        default: () => ({
            login: mockLogin,
            loading: false,
            error: null,
        }),
    })
);


describe("LoginForm", () => {

    it("renders login form", () => {

        render(<LoginForm />);

        expect(
            screen.getByLabelText(/email/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/password/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", {
                name: /sign in/i,
            })
        ).toBeInTheDocument();
    });


    it("shows validation errors for empty fields", async () => {

        const user = userEvent.setup();

        render(<LoginForm />);

        await user.click(
            screen.getByRole("button", {
                name: /sign in/i,
            })
        );

        expect(
            await screen.findByText(
                /valid email/i
            )
        ).toBeInTheDocument();

        expect(
            await screen.findByText(
                /at least 8 characters/i
            )
        ).toBeInTheDocument();

    });


    it("rejects invalid email", async () => {

        const user = userEvent.setup();

        render(<LoginForm />);

        await user.type(
            screen.getByLabelText(/email/i),
            "invalid-email"
        );

        await user.type(
            screen.getByLabelText(/password/i),
            "password123"
        );

        await user.click(
            screen.getByRole("button", {
                name: /sign in/i,
            })
        );

        expect(
            await screen.findByText(
                /valid email/i
            )
        ).toBeInTheDocument();

        expect(
            mockLogin
        ).not.toHaveBeenCalled();
    });


    it("submits valid credentials", async () => {

        const user = userEvent.setup();

        mockLogin.mockResolvedValueOnce({
            access_token: "test-token",
        });

        render(<LoginForm />);

        await user.type(
            screen.getByLabelText(/email/i),
            "louis@example.com"
        );

        await user.type(
            screen.getByLabelText(/password/i),
            "password123"
        );

        await user.click(
            screen.getByRole("button", {
                name: /sign in/i,
            })
        );

        await waitFor(() => {

            expect(mockLogin).toHaveBeenCalledWith({
                email: "louis@example.com",
                password: "password123",
            });

        });

    });


    it("toggles password visibility", async () => {

        const user = userEvent.setup();

        render(<LoginForm />);

        const passwordInput =
            screen.getByLabelText(/password/i);

        expect(
            passwordInput
        ).toHaveAttribute(
            "type",
            "password"
        );

        const toggleButton =
            screen.getByRole("button", {
                name: "",
            });

        await user.click(toggleButton);

        expect(
            passwordInput
        ).toHaveAttribute(
            "type",
            "text"
        );
    });

});