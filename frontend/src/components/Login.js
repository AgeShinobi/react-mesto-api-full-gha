import React, { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";

function Login ({isLoggedIn, onLogin}) {
  const [formValue, setFormValue] = useState({ email: '', password: ''});

  const handleChange = useCallback((e) => {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value})
  }, [formValue]);

  const handleSubmit = useCallback(async(e) => {
    try {
      e.preventDefault();
      onLogin(formValue);
    } catch (err) {
      console.log(err);
    }
  }, [onLogin, formValue]);

  if (isLoggedIn) {
    return <Navigate to='/' replace={true} />
  }


  return (
    <section className="register">
      <h2 className="register__title">
        Вход
      </h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          name="email" id="email-input" value={formValue.email}
          onChange={handleChange}
          className="register__input" type="email"
          minLength="2" maxLength='80'
          placeholder="Email" required
        />

        <input
          name="password" id="password-input" value={formValue.password}
          onChange={handleChange}
          className="register__input" type="password"
          minLength="8" maxLength="200"
          placeholder="Пароль" required
        />
        <button className="register__submit" type="submit">Войти</button>
      </form>
    </section>
  );
}

export default Login