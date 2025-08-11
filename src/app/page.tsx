"use client";

import { useForm } from "react-hook-form";
import { useGenFile } from "./genfileApi";
import { Alert, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface FormValues {
  name: string;
  date: string;
  toEmail: string;
}

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      date: "",
      toEmail: "",
    },
  });
  const genFileMutation = useGenFile();
   if (genFileMutation.isSuccess) {
    console.log("Mutation thành công!", genFileMutation.data);
  }
  if (genFileMutation.isError) {
    console.log("Mutation thất bại!", genFileMutation.data);
  }

  const onSubmit = (values: FormValues) => {
    // console.log("Form values:", values);
    genFileMutation.mutate(values, {
      onSuccess: (data) => {
        console.log("File generated successfully:", data);
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 relative">
      {/* Overlay loading khi đang gửi */}
      {genFileMutation.isPending && (
        <>
          <div className="fixed top-0 left-0 w-full h-24  z-[100] pointer-events-none" />
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-[101] flex flex-col items-center mt-4 pointer-events-none">
            <div className="w-12 h-12 flex items-center justify-center">
              <CircularProgress />
            </div>
            <div className="mt-2 text-base font-semibold text-blue-700">Đang gửi...</div>
          </div>
        </>
      )}
      <form
        className="w-full max-w-md flex flex-col gap-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset disabled={genFileMutation.isPending} className="contents">
          {/* ...existing code... */}
          <div className="flex flex-col gap-4">
            <label className="font-medium">Name</label>
            <input {...register("name")} type="text" placeholder="Nhập tên" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-medium">Date</label>
            <input {...register("date")} type="date" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-medium">Email</label>
            <input {...register("toEmail")} type="email" placeholder="Nhập email" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
            {genFileMutation.isPending ? "Đang gửi..." : "Send"}
          </button>
        </fieldset>
      </form>

      {genFileMutation.isSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Gửi mail thành công
          </Alert>
        </div>
      )}
      {genFileMutation.isError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Lỗi không gửi được mail
          </Alert>
        </div>
      )}
    </div>
  );
}