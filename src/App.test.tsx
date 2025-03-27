import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { test, expect } from "vitest";
import React from "react";
import '@testing-library/jest-dom/vitest';
import TodoTable from "./TodoTable";
import { afterEach } from "node:test";

test("renders App component", () => {
    render(<App />);
    const header = screen.getByText(/My Todolist/i);
    expect(header).toBeInTheDocument();
});

test('renders todotable', () => {
    const row = [
        { description: 'Go to coffee', date: '24.01.2025' }
    ];

    render(<TodoTable todos={row} />);

    const table = screen.getByRole('table');
    expect(table).not.toHaveTextContent(/go to coffee/i);
});


afterEach(() => {
    cleanup();
})

test("add todo", () => {
    render(<App />);

    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go to coffee" } });

    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "29.01.2025" } });

    const button = screen.getByText("Add");
    fireEvent.click(button);

    const table = screen.getByRole("table");
    expect(table).toHaveTextContent(/go to coffee/i);
});
