import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext);
    return(
        <BoxContainer>
            <FormContainer>
              <Input type="text" placeholder="Full Name"/>
              <Input placeholder="National ID"/>
              <Input type="email" placeholder="Email"/>
              <Input type="password" placeholder="Password"/>
              <Input type="password" placeholder="Confirm Password"/>

            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            
            <SubmitButton type="submit">Signup</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">
                Already have an accoun?
                <BoldLink href="#" onClick={switchToSignin}>
                  Signin
                </BoldLink>
                <Marginer direction="vertical" margin="1.8em" />
            </MutedLink>
        </BoxContainer>
    );
}
