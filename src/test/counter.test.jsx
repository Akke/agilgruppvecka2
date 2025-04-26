import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter/Counter.jsx";
describe('Counter Component', () => {
    it("visar att count är 0 som standard", () => {
      render(<Counter />);
      expect(screen.getByText("0")).toBeDefined();
    });
  
    test("värdet ökar med 1 efter klick", () => {
      render(<Counter />); 
      const button = screen.getByText("Öka"); 
      const counterValue = screen.getByTestId("counter-value"); 
  
      fireEvent.click(button); 
      expect(counterValue.textContent).toBe("1"); 
    });
  });