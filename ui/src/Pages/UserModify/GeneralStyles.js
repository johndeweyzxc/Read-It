import styled from "styled-components";

export const RegisterDiv = styled.div`
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 600px) {
    height: auto;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const RegisterTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: 0.5rem;
  font-size: 1.75rem;
  font-family: "JetBrains mono", monospace;
  align-self: center;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 400px) {
    font-size: 1.25rem;
  }
`;

export const RegisterInputSection = styled.div`
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RegisterInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-right: 1rem;
`;

export const RegisterInputs = styled.input`
  padding: 0.5rem;
  width: 25vw;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #eb4141;
  outline: none;
  font-size: 1.25rem;
  font-family: "JetBrains Mono", monospace;
  @media screen and (max-width: 600px) {
    width: 70vw;
  }
  @media screen and (max-width: 400px) {
    font-size: 1rem;
  }
`;

export const RegisterLabel = styled.label`
  margin-bottom: 0.25rem;
  font-size: 1rem;
  font-family: "JetBrains mono", monospace;
`;

export const RegisterButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding: 0.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
  align-self: center;
  font-size: 1rem;
  @media screen and (max-width: 400px) {
    font-size: 0.9rem;
  }
  font-family: "JetBrains mono", monospace;
  letter-spacing: 1px;
  background-color: #eb4141;
  border: 1px solid #eb4141;
  border-radius: 0.5rem;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`;
