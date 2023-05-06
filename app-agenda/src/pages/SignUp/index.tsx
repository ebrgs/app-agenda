import { Form } from "../../styles/BaseForm";
import { Container } from "../../styles/Container";
import "./style.css"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useContext, useEffect} from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"
import { UserContext } from "../../providers/User"

const RegisterPage = () => {
    const formSchema = yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        email: yup.string().email().required("Email obrigatório"),
        phone: yup.string().required("Telefone obrigatório")
    })

    const { createNewUser }: any = useContext(UserContext)

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(formSchema)
    }) 

    useEffect(()=> {
        Object.keys(errors).length && toast.warn("Ops, algo de errado aconteceu!")
    }, [errors])

    return (
        <div>
            <div className="boxButton">
                <h2>Cadastro</h2>
                <Link to="/">Voltar</Link>
            </div>
            <Container>
                <Form onSubmit={handleSubmit(createNewUser)}>
                    <input type="text" placeholder='Nome' {...register("name")}/>
                    <input type="email" placeholder='Email' {...register("email")}/>
                    <input type="text" placeholder='Telefone' {...register("phone")}/>
                    <button type="submit">Cadastrar</button>
                </Form>
            </Container>
        </div>
    )
}

export default RegisterPage