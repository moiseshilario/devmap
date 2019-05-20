import styled from 'styled-components';

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;

  padding: 15px;
  width: 270px;
  background: #fff;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0px 2px 0px #777;

  h1 {
    margin: 0;
    font-size: 18px;
    color: #555;
  }
`;

export const UserInput = styled.input`
  outline: none;
  height: 50px;
  width: 100%;
  border-radius: 5px;
  border: solid 1px #eee;
  font-size: 16px;
  margin: 10px 0;
  padding: 0 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  button {
    padding: 10px 30px;
    font-size: 13px;
    border-radius: 5px;
    border: none;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    color: #fff;

    &:hover {
      opacity: 1;
    }
  }

  .button__cancel {
    background: #bbb;
  }

  .button__save {
    background: #0d8;
  }
`;
