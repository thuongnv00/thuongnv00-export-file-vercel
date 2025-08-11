import { useGenFile } from "@/app/genfileApi";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  date: string;
  email: string;
}

export default function GenFile() {
    const { register, handleSubmit, reset } = useForm<FormValues>({
        defaultValues: {
            name: '',
            date: '',
            email: '',
        }
    });

    const genfile = useGenFile();
    const onSubmit = (values: FormValues) => {
        genfile.mutate(values, {
            onSuccess: (data) => {

                alert("Gửi thành công!" + (data?.message ? "\n" + data.message : ""));
                reset();
            },
            onError: () => {
            }
        });
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="Name" />
            <input {...register("date")} placeholder="Date" />
            <input {...register("email")} placeholder="Email" />
            <button type="submit">Submit</button>
        </form>
    );
}