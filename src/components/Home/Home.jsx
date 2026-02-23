import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const schema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    console.log(data);
    await axios
      .post("https://todo-nti.vercel.app/todo/create", data, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/profile");
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <div className="container flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <div>
            <div className="mb-6">
              <label
                className="block mb-2.5 text-sm font-medium text-heading"
                htmlFor="title"
              >
                Task Title
              </label>
              <input
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                id="title"
                placeholder="Enter task title..."
                type="text"
                {...register("title")}
              />
              <p className="text-red-500 mt-1">{errors.title?.message}</p>
            </div>

            <div className="mb-6">
              <label
                className="block mb-2.5 text-sm font-medium text-heading"
                htmlFor="description"
              >
                Task Description
              </label>
              <textarea
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body resize-none"
                id="description"
                placeholder="Enter task description..."
                rows={5}
                {...register("description")}
              />
              <p className="text-red-500 mt-1">{errors.description?.message}</p>
            </div>

            <button
              className={`text-white box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-all
                ${
                  isSubmitting
                    ? "bg-brand/50 cursor-not-allowed opacity-60"
                    : "bg-brand hover:bg-brand-strong"
                }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Add Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
