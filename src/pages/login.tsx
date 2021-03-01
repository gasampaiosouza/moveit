import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import setPageTitle from '../helpers/setPageTitle';
import { IUser } from '../interfaces';
import style from '../styles/pages/Login.module.scss';

interface IForm {
  active: boolean | number;
  user?: string;
  error?: string;
}

interface IError {
  status: boolean | number;
  message?: string;
}

const Login: React.FC = () => {
  const [formOptions, setFormOptions] = useState<IForm>({ active: false });
  const [error, setError] = useState<IError>({ status: false });
  const router = useRouter();

  useEffect(() => {
    setPageTitle('Login | move.it');
  }, []);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 1) {
      return setFormOptions({ active: 1, user: target.value });
    }

    return setFormOptions({ active: 0, user: target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `https://api.github.com/users/${formOptions.user}`
    );

    if (response.status == 404) {
      return setError({
        status: true,
        message: 'Esse usuário não foi encontrado :(',
      });
    }

    if (error.status) setError({ status: false });

    const userData: IUser = await response.json();
    const userInfoToSave = { isLoggedIn: true, ...userData };

    cookies.set('user', userInfoToSave);

    router.replace('/');
  };

  return (
    <div className={style.container}>
      <section className={style.containerLeftSide}>
        <img src="images/login-logo-big.svg" alt="Login logo" />
      </section>

      <section className={style.containerRightSide}>
        <img className={style.logo} src="images/logo.svg" alt="move.it logo" />

        <h2>Bem-vindo</h2>

        <div className={style.githubMessage}>
          <img src="icons/github.svg" alt="github logo" />
          <span>Faça login com seu Github para começar</span>
        </div>

        <form
          className={`${style.loginForm} ${formOptions.active && style.active}`}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Digite seu username"
            onChange={handleInputChange}
          />

          <button disabled={!formOptions.active}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>

        {error.status && <p className={style.formError}>{error.message}</p>}
      </section>
    </div>
  );
};

export default Login;
