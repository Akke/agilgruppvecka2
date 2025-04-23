import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter/Counter.jsx";

it("visar att count är 0 som standard", () => {
    render(<Counter />);
    expect(screen.getByText("0")).toBeDefined();
});