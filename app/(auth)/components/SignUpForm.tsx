"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { SignUpSchema } from "@/app/(auth)/schemas";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signUpAction } from "../_actions/sign-up.action";

type SignUpFormProps = {
  goToSignIn: () => void;
  onSuccess: () => void;
}

export function SignUpForm({ goToSignIn, onSuccess }: SignUpFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const result = await signUpAction(values);

    if (!result.success) {
      toast.error(result.message);
    } else {
      form.reset();
      toast.success(result.message);
      onSuccess();
      router.push('/')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім&apos;я</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Прізвище</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефону</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Повторіть пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-black hover:bg-black/90">
          ЗАРЕЄСТРУВАТИСЯ
        </Button>
        <div className="text-center text-sm">
          <span className="text-gray-600">Вже маєте обліковий запис? </span>
          <span className="text-gray-600 font-semibold cursor-pointer hover:underline" onClick={() => goToSignIn()}>
            Увійти
          </span>
        </div>
      </form>
    </Form>
  );
}
