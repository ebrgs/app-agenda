import { useContext, useEffect, useState } from 'react'
import './style.css'
import { UserContext } from '../../providers/User'
import { BiTrash, BiPencil } from "react-icons/bi";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Modal from '../../components/modal';

function Dashboard() {
    const { getUserData, user, createNewContact, deleteContact, logout, setIdUpdate }: any = useContext(UserContext)
    const emailUser = localStorage.getItem("@EMAIL")
    useEffect(() => {
        getUserData(emailUser)
    }, [])
    const [ modalOpen, setModalOpen ] = useState(false)

    function openModal(id: string) {
        setModalOpen(true)
        setIdUpdate(id)
    }
    function closeModal() {
        setModalOpen(false)
        setIdUpdate("")
    }

    const formSchema = yup.object().shape({
        name: yup.string().required("Nome obrigatório"),
        email: yup.string().required("Email obrigatório"),
        phone: yup.string().required("Telefone obrigatório")
    })

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(formSchema)
    })
    

    return (
        <div className="divDash">
            <div className="divDashHeader">
                <div className='boxUser'>
                    <span className='userLetter'>{user.name?.substr(0, 1).toUpperCase()}</span>
                    <span className='userRest'>{user.name?.substr(1)}</span>
                </div>
                <button type='button' onClick={() => logout()}>Sair</button>
            </div>
            <div className='divDashContacts'>
                <h2 className='newContact'>Adicionar novo contato</h2>
                <form className='createContact' onSubmit={handleSubmit(createNewContact)}>
                    <input type="text" placeholder='Nome' {...register("name")}/>
                    <input type="email" placeholder='Email' {...register("email")}/>
                    <input type="text" placeholder='Telefone' {...register("phone")}/>
                    <button type='submit'>+</button>
                </form>
                <ul>
                    {user.contacts?.map((contact: any) => {
                        return <li id={contact.id}>
                            <h2>{contact.name}</h2>
                            <p>{contact.email}</p>
                            <p>{contact.phone}</p>
                            <div className='buttonsContact'>
                                <span onClick={() => deleteContact(contact.id)}><BiTrash/></span>
                                <span onClick={() => openModal(contact.id)}><BiPencil/></span>
                            </div>
                        </li>
                    })}
                </ul>
                <Modal isOpen={modalOpen} onClose={closeModal} />
            </div>
        </div>
    )
}

export default Dashboard