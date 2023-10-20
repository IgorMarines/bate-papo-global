import styled from "styled-components";

export const Container = styled.div`
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 30px;
    border-radius: 5px;
    text-align: center;

    h2 {
        padding-bottom: 25px;
    }
`

export const Body = styled.div`
    max-width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #36393F;
    color: #000;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: bold;
    padding-bottom: 25px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-weight: 800;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background: #4e5058;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 800;
`;