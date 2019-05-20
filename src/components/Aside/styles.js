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

  h1 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 18px;
    color: #555;
    text-align: center;
  }

  .user {
    display: flex;
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

  .close-button {
    display: flex;
    align-content: center;
    justify-content: center;
    color: #c00;
    font-size: 25px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    cursor: pointer;

    span {
      transform: rotate(45deg);
    }
  }
`;

export const Separator = styled.hr`
  border: 0.5px solid #ddd;
`;
