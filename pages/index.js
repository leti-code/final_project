import React from 'react';
import MainLayout from "layouts/MainLayout"

const Index = () => {
  const prueba = async (e) => {
    console.log("click....");
    e.preventDefault();
    const res = await fetch('/api/user/', {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      })

      const json = await res.json();

      console.log(json);
  };

  return(
    <MainLayout>
    INDEX
    <button onClick={(e)=>prueba(e)}>prueba</button>
    </MainLayout>
  );
} 

export default Index;

