import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Raknare from "../components/Raknare"

describe('Raknare-komponent', () => {
  test('visar 0 från början', () => {
    render(<Raknare />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('Öka', () => {
    render(<Raknare />);
    const button = screen.getByText('Öka');
    fireEvent.click(button);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

