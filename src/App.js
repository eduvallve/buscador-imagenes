import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./header.css";
import "./content.css";
import "./article.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = (url) => window.open(url);
  console.log({ photos });
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?client_id=HFFe9M3M6s7EtAXRPylQ1yU19lcpBL0eAJ-9WBPfMZ0&per_page=20&query=${values.search}`
            );
            const data = await response.json();
            // llamar a API de unsplash
            setPhotos(data.results);
          }}
        >
          <Form>
            <label>
              {" "}<small>Search a word here:</small>{" "}
            </label>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <main className="container">
        <section className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default App;
