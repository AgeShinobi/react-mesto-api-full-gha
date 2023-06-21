import React, { useState, useCallback } from "react";
import { Link, Navigate } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
  }, [formValue]);

  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();
      onRegister(formValue);
    } catch (err) {
      console.log(err);
    } finally {
      setFormValue({ email: '', password: '' })
    }
  }, [onRegister, formValue]);

  if (isLoggedIn) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <section className="register">
      <h2 className="register__title">
        Регистрация
      </h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          name="email" id="email-input" onChange={handleChange}
          value={formValue.email}
          className="register__input" type="email"
          minLength="2" maxLength='50'
          placeholder="Email" required
        />

        <input
          name="password" id="password-input" onChange={handleChange}
          value={formValue.password}
          className="register__input" type="password"
          minLength="8" maxLength="200"
          placeholder="Пароль" required
        />
        <button className="register__submit" type="submit">Зарегистрироваться</button>
      </form>
      <Link to='/sign-in' className="register__question">Уже зарегистрированы? Войти</Link>
    </section>
  );
}

export default Register;