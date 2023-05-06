import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

interface iUserContextProps{
    children: React.ReactNode;
}

export const UserContext = createContext({})

export const UserProvider = ({ children }: iUserContextProps) => {
    const [user, setUser] = useState({})
    const userEmail: any = localStorage.getItem("@EMAIL")
    const [idUpdate, setIdUpdate] = useState()
    const token = localStorage.getItem("@TOKEN")
    const navigate = useNavigate()

    async function createNewUser(data: any) {
        console.log(data)
        await api.post("users", data)
            .then(res => {
                console.log(res)
                toast.success("Usuario cadastrado com sucesso")
                setTimeout(() => {
                    navigate('/')
                }, 2000)
                return res
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function loginUser(data: any) {
        await api.post("login", data)
        .then(res => {
            toast.success("Login bem sucedido! Seja bem vindo! :D")
            localStorage.setItem("@TOKEN", res.data.access_token)
            localStorage.setItem("@EMAIL", data.email.toString())
            navigate("dashboard")
            return res
        })
        .catch(err => {
            toast.warn(err.response.data.message)
        })
    }
    async function getUserData(email: string) {
        await api.get(`/users/user/${email}`)
            .then((res) => {
                setUser(res.data)
                return res
            })
            .catch((err) => {
                console.log(err)
            })
    }
    async function createNewContact(data: Object) {
        await api.post('users/contact', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                getUserData(userEmail)
                toast.success("Contato cadastrado com sucesso")
                return res
            })
            .catch((err) => {
                console.log(err)
            })
    }
    async function deleteContact (id: string) {
        api.delete(`users/contact/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            toast.success("Contado apagado!")
            getUserData(userEmail)
            return res
        })
        .catch(err => console.log(err))
    }
    async function updateContact (data: any) {
        api.patch(`users/contact/${idUpdate}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            toast.success("Contato atualizado")
            getUserData(userEmail)
            return res
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function logout() {
        localStorage.clear()
        setUser('')
        navigate('/')
    }

    return (
        <UserContext.Provider value={{user, setUser, loginUser, getUserData, createNewContact, deleteContact, logout, setIdUpdate, updateContact, createNewUser}}>
            {children}
        </UserContext.Provider>
    )
}