import { render } from "@testing-library/react"
import App from "./App"

test("renders the app", () => {
  render(<App />)
  // Basic test to ensure the app renders without crashing
  expect(document.querySelector(".app")).toBeInTheDocument()
})
