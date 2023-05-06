import { Form } from "../../styles/BaseForm"
import { Container } from "../../styles/Container"
import { Link } from "react-router-dom"
import "./style.css"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import { useContext, useEffect } from "react"
import { UserContext } from "../../providers/User"

const LoginPage = () => {
    const { loginUser }: any = useContext(UserContext)

    const formSchema = yup.object().shape({
        email: yup.string().required("Email obrigatório"),
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(formSchema)
    })

    useEffect(()=> {
        Object.keys(errors).length && toast.warn("Ops, algo de errado aconteceu!")
    }, [errors])

    return (
        <div className="divLogin">
            <Container>
                <Form onSubmit={handleSubmit(loginUser)}>
                    <h2>Login</h2>
                    <label htmlFor="email" id="email">Email</label>
                    <input type="email" placeholder="Seu email" {...register("email")}/>
                    <p>{(errors.email?.message)as string}</p>

                    <button type="submit">Entrar</button>
                </Form>

                <span>Ainda não possui uma conta?</span>
                <Link to="register">Cadastre-se</Link>
            </Container>
        </div>
    )
}

export default LoginPage
