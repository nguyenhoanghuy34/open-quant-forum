import { describe, expect, it, vi } from "vitest";

import {
    render,
    screen,
    waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import RegisterForm from "./RegisterForm";


const mockRegisterAccount = vi.fn();


vi.mock(
    "../../auth/hooks/useAuth",
    () => ({
        default: () => ({
            registerAccount:
                mockRegisterAccount,

            loading: false,

            error: null,
        }),
    })
);


describe("RegisterForm", () => {

    it("renders registration form", () => {

        render(<RegisterForm />);

        expect(
            screen.getByLabelText(/username/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/email/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(/^password$/i)
        ).toBeInTheDocument();

        expect(
            screen.getByLabelText(
                /confirm password/i
            )
        ).toBeInTheDocument();

    });


    it("rejects short username", async () => {

        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText(/username/i),
            "ab"
        );

        await user.click(
            screen.getByRole("button", {
                name: /create account/i,
            })
        );

        expect(
            await screen.findByText(
                /at least 3 characters/i
            )
        ).toBeInTheDocument();

    });


    it("rejects mismatched passwords", async () => {

        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText(/username/i),
            "louis"
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "louis@example.com"
        );

        await user.type(
            screen.getByLabelText(/^password$/i),
            "password123"
        );

        await user.type(
            screen.getByLabelText(
                /confirm password/i
            ),
            "different123"
        );

        await user.click(
            screen.getByRole("button", {
                name: /create account/i,
            })
        );

        expect(
            await screen.findByText(
                /passwords do not match/i
            )
        ).toBeInTheDocument();

        expect(
            mockRegisterAccount
        ).not.toHaveBeenCalled();

    });


    it("requires terms acceptance", async () => {

        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText(/username/i),
            "louis"
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "louis@example.com"
        );

        await user.type(
            screen.getByLabelText(/^password$/i),
            "password123"
        );

        await user.type(
            screen.getByLabelText(
                /confirm password/i
            ),
            "password123"
        );

        await user.click(
            screen.getByRole("button", {
                name: /create account/i,
            })
        );

        expect(
            await screen.findByText(
                /accept the terms/i
            )
        ).toBeInTheDocument();

    });


    it("submits valid registration data", async () => {

        const user = userEvent.setup();

        mockRegisterAccount.mockResolvedValueOnce({
            id: 1,
            username: "louis",
            email: "louis@example.com",
        });

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText(/username/i),
            "louis"
        );

        await user.type(
            screen.getByLabelText(/email/i),
            "louis@example.com"
        );

        await user.type(
            screen.getByLabelText(/^password$/i),
            "password123"
        );

        await user.type(
            screen.getByLabelText(
                /confirm password/i
            ),
            "password123"
        );

        await user.click(
            screen.getByLabelText(
                /terms/i
            )
        );

        await user.click(
            screen.getByRole("button", {
                name: /create account/i,
            })
        );

        await waitFor(() => {

            expect(
                mockRegisterAccount
            ).toHaveBeenCalledWith({
                username: "louis",
                email: "louis@example.com",
                password: "password123",
            });

        });

    });

});