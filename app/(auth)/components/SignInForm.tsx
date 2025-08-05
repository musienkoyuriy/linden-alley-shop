"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import { SignInSchema } from "@/app/(auth)/schemas";
import { signInAction } from "../_actions/sign-in.action";

type SignInFormProps = {
  goToSignUp: () => void;
  onSuccess: () => void;
}

export function SignInForm({ goToSignUp, onSuccess }: SignInFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    const result = await signInAction({ email: values.emailOrPhone, password: values.password });

    if (!result.success) {
      form.setError("emailOrPhone", { message: result.error });
    } else {
      form.reset();
      onSuccess();
      router.push('/');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email або номер телефону</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-black hover:bg-black/90">
          Увійти
        </Button>
        <div className="text-center text-sm">
          <span className="text-gray-600">Немає облікового запису? </span>
          <span className="text-gray-600 font-semibold cursor-pointer hover:underline" onClick={() => goToSignUp()}>
            Зареєструватися
          </span>
        </div>
      </form>
    </Form>
  )
}
