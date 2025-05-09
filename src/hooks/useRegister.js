import { useFormContext } from "react-hook-form";

function useRegister(name, validation = {}) {
    const {register} = useFormContext();
    return {...register(name, validation)}
}

export default useRegister;