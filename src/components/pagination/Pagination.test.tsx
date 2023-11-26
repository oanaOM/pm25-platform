import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";
import { it, expect, jest } from "@jest/globals";
import React from "react";

describe("<Pagination>", () => {
  it("renders a pagination component", async () => {
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={() => {}}
        handleNavigationBackward={() => {}}
        currentIndex={0}
      />
    );
    expect(screen.getByText("Page 1 out of 3")).toBeInTheDocument();

    // ASSERT
    expect(screen.getByTestId("btn-right-nav")).toBeInTheDocument();
    expect(screen.getByTestId("btn-left-nav")).toBeInTheDocument();
  });

  it("disables left navigation on the first page", async () => {
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={() => {}}
        handleNavigationBackward={() => {}}
        currentIndex={0}
      />
    );
    expect(screen.getByText("Page 1 out of 3")).toBeInTheDocument();

    // ASSERT
    expect(screen.getByTestId("btn-left-nav")).toBeDisabled();
    expect(screen.getByTestId("btn-right-nav")).toBeInTheDocument();
  });

  it("disables right navigation on the last page", async () => {
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={() => {}}
        handleNavigationBackward={() => {}}
        currentIndex={20}
      />
    );
    expect(screen.getByText("Page 3 out of 3")).toBeInTheDocument();

    // ASSERT
    expect(screen.getByTestId("btn-right-nav")).toBeDisabled();
    expect(screen.getByTestId("btn-left-nav")).toBeEnabled();
  });

  it("enables left navigation the rest of the pages except the first one", async () => {
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={() => {}}
        handleNavigationBackward={() => {}}
        currentIndex={10}
      />
    );
    expect(screen.getByText("Page 2 out of 3")).toBeInTheDocument();

    // ASSERT
    expect(screen.getByTestId("btn-left-nav")).toBeEnabled();
  });

  it("enables right navigation the rest of the pages except on the last page", async () => {
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={() => {}}
        handleNavigationBackward={() => {}}
        currentIndex={10}
      />
    );
    expect(screen.getByText("Page 2 out of 3")).toBeInTheDocument();

    // ASSERT
    expect(screen.getByTestId("btn-right-nav")).toBeEnabled();
  });

  it("class handleNavigationForward when user is navigating forward ", async () => {
    const mockHandleNavigationForward = jest.fn();
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={mockHandleNavigationForward}
        handleNavigationBackward={() => {}}
        currentIndex={20}
      />
    );
    expect(screen.getByText("Page 3 out of 3")).toBeInTheDocument();

    // ACT
    await userEvent.click(screen.getByTestId("btn-left-nav"));

    // ASSERT
    expect(mockHandleNavigationForward).toHaveBeenCalledTimes(1);
  });

  it("class handleNavigationBackward when user is navigating forward ", async () => {
    const mockHandleNavigationBackward = jest.fn();
    // ARRANGE
    render(
      <Pagination
        totalItems={23}
        itemsPerPage={10}
        handleNavigationForward={() => {}}
        handleNavigationBackward={mockHandleNavigationBackward}
        currentIndex={0}
      />
    );
    expect(screen.getByText("Page 1 out of 3")).toBeInTheDocument();

    // ACT
    await userEvent.click(screen.getByTestId("btn-right-nav"));

    // ASSERT
    expect(mockHandleNavigationBackward).toHaveBeenCalledTimes(1);
  });
});
