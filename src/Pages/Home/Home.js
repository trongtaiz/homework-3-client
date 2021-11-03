import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import * as Styled from "./Home.styled";
import Class from "../../Components/Class";
import * as classService from "../../Services/class.service";

function Home() {
  const [listOfClass, setListOfClass] = useState([]);

  const handleGetClassList = async () => {
    const { data } = await classService.getAllClass();
    console.log(data);
    setListOfClass(data);
  };
  useEffect(() => {
    handleGetClassList();
  }, []);

  return (
    <div>
      <Header />
      <Styled.Wrapper>
        {listOfClass.map((eachClass) => (
          <Class key={eachClass.id} name={eachClass.name} />
        ))}
      </Styled.Wrapper>
    </div>
  );
}

export default Home;
