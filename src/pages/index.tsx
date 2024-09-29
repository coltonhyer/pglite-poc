import Card from './card.tsx';
import { useEffect, useState } from 'react';
import db, { initDB } from '../db'


export default function Home() {
  /*
    React/Next has a traditional integration with pg-lite. However, this PoC will eventually get integrated into a codebase
    that utilizes a custom made framework without this integration. For that purpose we will natively use and install pg-lite
    to mimic that behavior
  */
  useEffect(() =>{
    const fetchData = async () =>{
      await initDB();
      console.log(db);
    }
    fetchData()
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      <Card />
    </div>
  );
}
