import { shallow, mount } from "enzyme";
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

describe("SignUpBox form email input", () => {
  it("has input field for email", () => {
    const wrapper = mount(<SignUp />);
    const emailInput = wrapper.find("#email");
    expect(emailInput.exists()).toEqual(true);
    expect(emailInput.matchesElement(<input id="email" />)).toEqual(true);
  });
});

describe("SignUpBox form password input", () => {
  it("has input field for password", () => {
    const wrapper = mount(<SignUp />);
    const passwordInput = wrapper.find("#password");
    expect(passwordInput.exists()).toEqual(true);
    expect(passwordInput.matchesElement(<input id="password" />)).toEqual(true);
  });
});
