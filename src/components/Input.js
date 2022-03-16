import { useForm } from "react-hook-form";

const Input = ({createFunction}) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
      const newTodo = {...data, done: false}
      createFunction(newTodo);
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("label", { required: true })} />

          {errors.label && <span>This field is required</span>}
          
          <input type="submit" value="Add" className="bg-blue-500 rounded" />
        </form>
      );
}

export default Input;