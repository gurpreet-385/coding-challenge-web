import { useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import useFetchAPI from "./hooks/useFetchAPI";
import CatList from "./components/CatList";
import { API_URL } from "./index";

const App = () => {
  const { data, loading, error } = useFetchAPI({
    url: API_URL,
    initialData: [],
  });

  const getCatsByGender = () => {
    const cats = {};

    data.forEach((person) => {
      if (person.pets) {
        person.pets.forEach((pet) => {
          const gender = person.gender.toLowerCase();
          if (pet.type === "Cat") {
            if (!cats[gender]) {
              cats[gender] = {
                catDetails: [],
              };
            }

            const catDetails = {
              catName: pet.name,
              ownerName: person.name,
            };

            cats[gender].catDetails.push(catDetails);
          }
        });
      }
    });
    Object.keys(cats).forEach((gender) => {
      cats[gender].catDetails.sort((a, b) =>
        a.catName.localeCompare(b.catName),
      );
    });

    return cats;
  };

  return (
    <Container className="App">
      <h1 className="mt-4 mb-4">Cats List</h1>
      {loading}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && Object.keys(data).length > 0 && (
        <>
          {Object.entries(getCatsByGender()).map(([gender, { catDetails }]) => (
            <CatList key={gender} gender={gender} catDetails={catDetails} />
          ))}
        </>
      )}
    </Container>
  );
};

export default App;