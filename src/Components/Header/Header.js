import React, { useState } from "react";

import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import * as classService from "../../Services/class.service";

import AddClassModal from "../AddClassModal";

import * as Styled from "./Header.styled";

function Header() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [className, setClassName] = useState("");

  const handleChangeClassName = (e) => {
    setClassName(e.target.value);
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const result = await classService.createClass({ name: className });
      console.log(result);
      setAddModalOpen(false);
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Styled.HeaderWrapper>
        <Typography variant="h5">Classroom</Typography>
        <IconButton onClick={() => setAddModalOpen(!addModalOpen)}>
          <AddIcon />
        </IconButton>
      </Styled.HeaderWrapper>
      <AddClassModal
        isOpen={addModalOpen}
        setIsOpen={setAddModalOpen}
        modalName="Create a new class"
      >
        <Styled.Input
          required
          id="outlined-basic"
          label="Name of class"
          variant="outlined"
          value={className}
          onChange={handleChangeClassName}
        />
        <Styled.MaterialButton
          disabled={!className}
          onClick={handleCreateClass}
        >
          Create Class
        </Styled.MaterialButton>
      </AddClassModal>
    </>
  );
}

export default Header;
