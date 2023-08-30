import styled from 'styled-components';
export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.form`
    padding: 20px;
    border: black 2px solid;
    width: 50%;
    height: 30%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    color: white;
    text-align: center;
`;

export const InputLabel = styled.label`
    color: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    padding: 9px;
    font-size: 16px;
    border-width: 3px;
    border-color: #cccccc;
    background-color: #ffffff;
    color: #000000;
    border-style: solid;
    border-radius: 12px;
    width: 90%;
    margin-left: 10px;
    margin-right: 10px;
`;
