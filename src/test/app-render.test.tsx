import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "../App";

describe("App rendering", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
