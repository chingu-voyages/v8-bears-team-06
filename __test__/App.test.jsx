import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import App from "../client/components/App";

describe("With Enzyme", () => {
  it('App shows "Hello, you Chingu beauty!"', () => {
    const app = shallow(<App />);

    expect(app.find("div").text()).toEqual("Hello, you Chingu beauty!");
  });
});

describe("With Snapshot Testing", () => {
  it('App shows "Hello, you Chingu beauty!"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
