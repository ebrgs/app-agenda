import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import './style.css'
import * as yup from "yup"
import { useContext } from 'react';
import { UserContext } from '../../providers/User';

const Modal = ({ isOpen, onClose } : any) => {
    const formUpdateSchema = yup.object().shape({
        name: yup.string(),
        email: yup.string(),
        phone: yup.string()
    })
    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(formUpdateSchema)
    })
    const { updateContact }: any = useContext(UserContext)
    if (!isOpen) {
        return null
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
        <form className='createContact' onSubmit={handleSubmit(updateContact)}>
                    <input type="text" placeholder='Nome' {...register("name")}/>
                    <input type="email" placeholder='Email' {...register("email")}/>
                    <input type="text" placeholder='Telefone' {...register("phone")}/>
                    <button type='submit'>+</button>
                </form>
          <button className="modal-close" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    );
};
  
export default Modal;