import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "./index";
import { registerEmail } from "@services/form";

jest.mock("@services/form", () => {
  return {
    registerEmail: jest.fn(),
  };
});

describe("@pages/Home", () => {
  it("should render correctly", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "A better way to enjoy every day."
    );
    expect(
      screen.getByText("Be the first to know when we launch.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /request an invite/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Made with ♥ in Melbourne./i)).toBeInTheDocument();
    expect(
      screen.getByText(/© 2023 Broccoli & Co. All rights reserved./i)
    ).toBeInTheDocument();
  });
  it('should open PopupForm when clicking "Request an invite"', async () => {
    render(<Home />);
    const inviteButton = screen.getByRole("button", {
      name: /request an invite/i,
    });
    await userEvent.click(inviteButton);
    expect(screen.getByPlaceholderText(/Full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });
  it("should close PopupForm when clicking outside the modal", async () => {
    render(<Home />);
    const inviteButton = screen.getByRole("button", {
      name: /request an invite/i,
    });
    await userEvent.click(inviteButton);
    expect(screen.getByPlaceholderText(/Full name/i)).toBeInTheDocument();
    const modalOverlay = screen.getByTestId("modal-overlay");
    await userEvent.click(modalOverlay);
    expect(screen.queryByPlaceholderText(/Full name/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Email")).not.toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("Confirm Email")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Send/i })
    ).not.toBeInTheDocument();
  });
  it('should show SuccessPopup when clicking "Send" button', async () => {
    (registerEmail as jest.Mock).mockResolvedValue("Registered");
    render(<Home />);
    const inviteButton = screen.getByRole("button", {
      name: /request an invite/i,
    });
    await userEvent.click(inviteButton);

    await userEvent.type(screen.getByPlaceholderText(/Full name/i), "mock");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "mock@gmail.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Confirm Email"),
      "mock@gmail.com"
    );
    const sendButton = screen.getByRole("button", { name: /Send/i });
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/All done!/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /You will be one of the first to experience Broccoli & Co. when we launch./i
        )
      ).toBeInTheDocument();
    });
    expect(registerEmail).toHaveBeenCalledWith({
      name: "mock",
      email: "mock@gmail.com",
    });
  });
  it("should show inline errors when form fields are empty", async () => {
    render(<Home />);

    const inviteButton = screen.getByRole("button", {
      name: /request an invite/i,
    });
    await userEvent.click(inviteButton);
    const sendButton = screen.getByRole("button", { name: /Send/i });
    await userEvent.click(sendButton);
    await waitFor(() => {
      expect(screen.getByText(/Full name is required/i)).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Confirm Email is required")).toBeInTheDocument();
    });
  });
  it("should show inline errors when form fields fail validations", async () => {
    render(<Home />);

    const inviteButton = screen.getByRole("button", {
      name: /request an invite/i,
    });
    await userEvent.click(inviteButton);
    await userEvent.type(screen.getByPlaceholderText(/Full name/i), "sh");
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "mock-invalid-email"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Confirm Email"),
      "mock-invalid-email"
    );

    const sendButton = screen.getByRole("button", { name: /Send/i });
    await userEvent.click(sendButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Full name need to be at least 3 characters long/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Email needs to be in valid email format. E.g. abc@gmail.com/i
        )
      ).toBeInTheDocument();
    });
  });
});
