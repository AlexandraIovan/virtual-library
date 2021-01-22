import { useState, useEffect, useRef } from "react";
import { BOOK_API_URL } from "./constants";

export function Books({ token, removeAuthToken }) {
  const [books, setBooks] = useState([]);
  const searchInput = useRef(null);
  const [searchValue, setSearchValue] = useState("");

  function search() {
    if (searchInput.current) {
      setSearchValue(searchInput.current.value.toLowerCase());
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    const elements = event.currentTarget.elements;
    const formData = new FormData();
    const informatii = {
      autor: elements.autori.value,
      titlu: elements.carti.value,
    };
    const pozaFile = elements.poza.files[0];
    const pdfFile = elements.pdf.files[0];
    if (pozaFile && pdfFile && informatii.autor && informatii.titlu) {
      formData.append("data", JSON.stringify(informatii));
      formData.append(`files.poza`, pozaFile, "poza");
      formData.append(`files.pdf`, pdfFile, "pdf");
      createBook(formData);
      elements.poza.value = "";
      elements.pdf.value = "";
      elements.autori.value = "";
      elements.carti.value = "";
    } else {
      alert("Informatiile pentru carte nu sunt complete.");
    }
  }

  function createBook(formData) {
    fetch(BOOK_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBooks([...books, data]);
      });
  }

  function deleteBook(bookId) {
    fetch(`${BOOK_API_URL}/${bookId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(function () {
      const newBooks = books.filter((book) => {
        if (book._id !== bookId) {
          return true;
        } else {
          return false;
        }
      });
      setBooks(newBooks);
    });
  }

  useEffect(() => {
    function getBooks() {
      fetch(BOOK_API_URL, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setBooks(data);
        });
    }
    getBooks();
  }, [token]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-sm btn-danger" onClick={removeAuthToken}>Logout</button>
        </div>
      </div>
      <div className="row mb-5">
        <div className="offset-3 col-6">
          <h3 className="text-center">Virtual Library</h3>
          <p className="quote">
            Cartea potrivita in mainile potrivite la timpul potrivit poate
            schimba lumea.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-4">
          <form className="card" onSubmit={onSubmit}>
            <div className="card-body">
            <div className="form-group">
              <label htmlFor="books">
                Nume Carte <span className="required">*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                id="books"
                name="carti"
                placeholder="Nume Carte"
              />
            </div>
            <div className="form-group">
              <label htmlFor="authors">
                Autor <span className="required">*</span>:
              </label>
              <input
                type="text"
                className="form-control"
                id="authors"
                name="autori"
                placeholder="Nume Autor"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">
                Adauga poza carte <span className="required">*</span>:
              </label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="poza"
                accept="image/jpeg"
              />
            </div>
            <div className="form-group mb-5">
              <label htmlFor="myPDF">
                Adauga PDF carte <span className="required">*</span>
              </label>
              <input
                type="file"
                className="form-control-file"
                id="myPDF"
                name="pdf"
                accept=".pdf"
              />
            </div>
              <button type="submit" className="btn btn-outline-secondary">
                Adauga Carte
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-12 col-lg-8">
          <div className="d-flex align-items-center mb-5">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Cauta carte..."
              aria-label="Search"
              ref={searchInput}
              onChange={search}
            />
          </div>
          <h4>Lista Carti:</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Poza</th>
                <th scope="col">Titlu</th>
                <th scope="col">Autor</th>
                <th scope="col">PDF</th>
                <th scope="col">Actiuni</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                const isFiltered =
                  book.autor.toLowerCase().indexOf(searchValue) !== -1 ||
                  book.titlu.toLowerCase().indexOf(searchValue) !== -1;
                return (
                  isFiltered && (
                    <tr key={book._id}>
                      <td>
                        <img
                          className="image"
                          src={book.poza.url}
                          alt={book.titlu}
                        />
                      </td>
                      <td>{book.titlu}</td>
                      <td>{book.autor}</td>
                      <td>
                        <a href={book.pdf.url} target="_blank" rel="noreferrer">
                          Descarca
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBook(book.id)}
                        >
                          Sterge
                        </button>
                      </td>
                    </tr>
                  )
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
