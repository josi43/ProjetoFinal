import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

export default function LoginForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const { handleLogin } = useContext(UserContext)
  const [errorLogin, setErrorLogin] = useState("")

  const validaEmail = {
    required: {
      value: true,
      message: 'Email é obrigatorio',
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Email inválido',
    }
  }

  const validaSenha = {
    required: {
      value: true,
      message: 'Senha é obrigatoria',
    },
    minLength: {
      value: 8,
      message: 'Senha deve ter no mínimo 8 caracteres',
    }
  }

  async function onSubmit(data) {
    const { email, senha } = data;
    setErrorLogin("")
    try {
      await handleLogin(email, senha)
      navigate("/")
    } catch (error) {
      setErrorLogin(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorLogin && <p className="erro">{errorLogin}</p>}
      <div className="input-container ic1">
        <input type="email" id="email" {...register("email", validaEmail)}  className="input" placeholder='Email'/>
        {errors.email && <p className="erro">{errors.email.message}</p>}
      </div>
      <div className="input-container ic1">
        <input type="password" id="senha" {...register("senha", validaSenha)}  className="input" placeholder='Senha'/>
        {errors.senha && <p className="erro">{errors.senha.message}</p>}
      </div>
      <button className="submit">Entrar</button>
    </form>
  )
}