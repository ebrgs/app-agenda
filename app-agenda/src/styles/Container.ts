import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;

    background-color: var(--grey-3);
    width: 90%;
    margin: 10px auto;
    max-width: 350px;
    padding: 18px;
    border-radius: 4px;

    span {
        font-size: 10px;
        color: var(--grey-1);
        text-align: center;
    }
    > button {
        height: 38px;
        background-color: var(--grey-1);
        color: var(--grey-0);
        border-radius: 4px;
        font-size: 13px;
        border: none;
    }
`