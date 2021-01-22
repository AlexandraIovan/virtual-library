import { AUTH_API_URL } from "./constants";

export function Authentication({ setAuthToken }) {
  function onSubmit(event) {
    event.preventDefault();
    const elements = event.currentTarget.elements;
    const identifier = elements.identifier.value;
    const password = elements.password.value;

    if (identifier && password) {
      fetch(AUTH_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }).then(response => response.json()).then(data => {
        if (data && data.jwt) {
          setAuthToken(data.jwt)
        } else {
          alert("Autentificarea a esuat");
        }
      });
    } else {
      alert("Email si Parola nu sunt introduse corect.");
    }
  }

  return (
    <div className="container">
      <div className="row pt-5 mt-5 justify-content-center">
        <div className="col-12 col-md-6 col-lg-4 col-xl-3 col-4">
          <form className="card" onSubmit={onSubmit}>
            <div className="card-body">
              <h4 className="mb-3 fw-normal">Please sign in</h4>
              <div className="form-group mb-3">
                <label htmlFor="inputEmail" className="visually-hidden">
                  E-mail:
                </label>
                <input
                  type="email"
                  id="inputEmail"
                  name="identifier"
                  className="form-control mb-3"
                  placeholder="Adresa e-mail"
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputPassword" className="visually-hidden">
                  Password:
                </label>
                <input
                  type="password"
                  id="inputPassword"
                  name="password"
                  className="form-control"
                  placeholder="Parola"
                />
              </div>
              <button className="w-100 btn btn-outline-primary" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
