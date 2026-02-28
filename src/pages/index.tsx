import Card from './card.tsx';
import { useEffect, useState } from 'react';
import { initDB } from '../db'


export default function Home() {
  const [isReady, setIsReady] = useState(false);
  /*
    React/Next has a traditional integration with pg-lite. However, this PoC will eventually get integrated into a codebase
    that utilizes a custom made framework without this integration. For that purpose we will natively use and install pg-lite
    to mimic that behavior
  */
  useEffect(() =>{
    const fetchData = async () =>{
      await initDB();
      setIsReady(true);
    }
    fetchData()
  }, [])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Initializing database...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card />
    </div>
  );
}
