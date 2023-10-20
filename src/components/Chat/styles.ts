import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #2400ff 0%, #000 100%);
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #000;
  height: 10%;
  color: #fff;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

export const UserImage = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
  margin-left: 10px;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;
  max-height: 400px;
  padding: 15px;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  div {
    margin-bottom: 10px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    outline: none;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #2400ff;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0000cc;
    }
  }
`;
