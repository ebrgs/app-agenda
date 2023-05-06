import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;

    label {
        font-size: 10px;
        color: #fff;
    }
    h2 {
        text-align: center;
        color: #fff;
        font-size: 15px;
    }
    input, select {
        height: 38px;
        border-radius: 4px;
        border: solid 2px var(--grey-1);
        background-color: var(--grey-2);
        padding: 0 16px;
        color: #FFF;
        outline: none;
    }
    button {
        height: 38px;
        background-color: var(--color-primary);
        border: none;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
    }
    p {
        font-size: 10px;
        color: red;
        text-align: end;
    }
`
