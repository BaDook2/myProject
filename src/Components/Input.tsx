import { UseFormRegisterReturn } from "react-hook-form";

interface ILogin {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}


const Input = ({ type, placeholder, register }: ILogin) => {
  const { onChange, onBlur, name, ref } = register || {};
  return (
    <input type={type} placeholder={placeholder} onChange={onChange} onBlur={onBlur} name={name} ref={ref} />
  )
}

export default Input