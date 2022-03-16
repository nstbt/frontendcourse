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
          <input className="border border-slate-200 py-0.5 px-1.5 mr-3" type="text" placeholder="I need to do ..." {...register("label", { required: true })} />

          {errors.label && <span>This field is required</span>}
          
          <input type="submit" value="Add" className="bg-purple-600 text-white rounded hover:bg-purple-400 py-0.5 px-3" />
        </form>
      );
}

export default Input;