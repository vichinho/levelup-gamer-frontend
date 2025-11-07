import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: "TEST001",
    code: "TEST001",
    name: "Test Product",
    category: "Test Category",
    price: 10000,
    description: "Test description",
    image: null,
  };

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  test("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("TEST001")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText(/10.000 CLP/i)).toBeInTheDocument();
  });

  test("calls onAddToCart with correct parameters when button is clicked", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const addButton = screen.getByText("Agregar");
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  test("allows changing quantity before adding to cart", () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const quantityInput = screen.getByDisplayValue("1");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    const addButton = screen.getByText("Agregar");
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  test("displays discount badge when product has discount", () => {
    const productWithDiscount = { ...mockProduct, discount: 20 };
    render(
      <ProductCard product={productWithDiscount} onAddToCart={mockAddToCart} />
    );

    expect(screen.getByText("-20%")).toBeInTheDocument();
  });
});
