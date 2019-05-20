import styled from 'styled-components';

export const AsideContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 9;
  width: 320px;
  height: 90vh;

  padding: 15px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px #222;
  text-align: center;
  color: #555;

  h1 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 18px;
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    position: relative;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      align-items: flex-start;
    }

    &__name {
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 14px;
    }

    &__login {
      font-style: italic;
      color: #777;
      font-size: 12px;
    }
  }

  button {
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 16px;
    border: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;

    &.close-button {
      color: #c00;
      margin-right: 12px;
    }

    &.locate-button {
      color: #777;
    }
  }
`;

export const Separator = styled.hr`
  border: 0.5px solid #ddd;
`;
