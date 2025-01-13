import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

function Search() {
  return (
    <Container>
      <SearchWrapper>
        <FiSearchIcon />
        <SearchBar placeholder="Search..." />
      </SearchWrapper>
    </Container>
  );
}

export default Search;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 750px;
  height: 52px;
  padding: 0 16px;
  border-radius: 24px;
  border: 3px solid #ddd;
  background-color: #fff;
`;

const FiSearchIcon = styled(FiSearch)`
  color: #aaa;
  font-size: 24px;
  margin-right: 8px;
`;

const SearchBar = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;
