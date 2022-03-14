import { useForm } from "react-hook-form";

const Input = ({createFunction}) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => createFunction(data);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("label", { required: true })} />

          {errors.label && <span>This field is required</span>}
          
          <input type="submit" />
        </form>
      );
}

export default Input;