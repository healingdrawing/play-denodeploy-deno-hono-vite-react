import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dino } from "../types.ts";
import { BACKHOST } from "../../../backend/deps"

export default function Index() {
  const [dinosaurs, setDinosaurs] = useState<Dino[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BACKHOST}/api/dinosaurs`);
      try{
        if (response.ok){
          console.log("response.ok is true")
          const response_json = await response.json();
          console.log(response_json);
          const allDinosaurs = response_json as Dino[];
          setDinosaurs(allDinosaurs);
        } else {
          // If response not okay, log the status
          console.log("Response not okay. Status:", response.status);
          // Throw an error here if you want to handle it in a higher level
          // throw new Error('Response not okay');
        }
      }
      catch (error){
        // Handle other network errors
        console.log("Error while processing the JSON response:", error);
      }
    })();
  }, []);

  return (
    <main>
      <h1>Welcome to the Dinosaur app</h1>
      <p>Click on a dinosaur below to learn more.</p>
      {dinosaurs.map((dinosaur: Dino) => {
        return (
          <Link
            to={`/${dinosaur.name.toLowerCase()}`}
            key={dinosaur.name}
            className="dinosaur"
          >
            {dinosaur.name}
          </Link>
        );
      })}
    </main>
  );
}
