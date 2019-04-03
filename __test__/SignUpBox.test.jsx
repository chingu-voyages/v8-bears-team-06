import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";

import SignUp from "../client/components/SignUpBox";

describe("With Enzyme", () => {
  it('SignUpBox shows "Sign Up"', () => {
    const signup = shallow(<SignUp />);

    expect(signup.find("h1").text()).toEqual("Sign Up");
  });
});

describe("With Snapshot Testing", () => {
  it('SignUpBox shows "Sign Up"', () => {
    const component = renderer.create(<SignUp />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
