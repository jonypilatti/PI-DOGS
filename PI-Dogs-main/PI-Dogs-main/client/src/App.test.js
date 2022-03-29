import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider, createStore } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Createdog from "./components/Functionals/CreateDog/Createdog";
import RootReducer from "./redux/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

test("renders Enter here!", () => {
  render(<App />);
  const linkElement = screen.getByText(/Enter here!/i);
  expect(linkElement).toBeInTheDocument();
});

describe("xdform1", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Createdog></Createdog>
        </BrowserRouter>
      </Provider>
    );
  });
  it("Should have a name", () => {
    const name = screen.getByLabelText("Name:");
    expect(name.type).tobe("text");
  });
});
