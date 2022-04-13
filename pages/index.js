//import React from 'react';
import MainLayout from "layouts/MainLayout";
import {useRouter} from 'next/router';

const Index = () => {
  /*const prueba = async (e) => {
    console.log("click....");
    console.log(process.env.MONGODB_URI_DEV);
    e.preventDefault();
    const res = await fetch('/api/user/', {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
      })

      const json = await res.json();

      console.log(json);
  };*/

  const router = useRouter();
  return(
    <MainLayout>
    INDEX
    <button onClick={()=>{
      router.push('/register');
    }}>Ve al registro</button>
    </MainLayout>
  );
} 

export default Index;

