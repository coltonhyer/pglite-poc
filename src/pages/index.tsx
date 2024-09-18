import Card from './card.tsx';
import { useEffect, useState } from 'react';
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import migrator from "../../migrator.ts";
import * as schema from '../db/schema';


export default function Home() {
  const [ number, setNumber ] = useState();
  useEffect(() =>{
    const fetchData = async () =>{
      const client = await PGlite.create("idb://test-database");

      const db = await drizzle(client, { schema });
      await migrator(db, { migrationsFolder: './drizzle'})
      debugger;
      try{
        const result = await db.query.Number.findFirst();
        console.log(result);
      }
      catch (err){
        console.error(err);
        // const user = await db.insert(schema.Number).values({value: 0});
        // console.log(user);
      }
    }
    fetchData()
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      <Card />
    </div>
  );
}
