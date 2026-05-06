"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PersonStandingIcon } from 'lucide-react'
import { Controller, useForm } from "react-hook-form"
import Link from 'next/link'
import * as z from "zod"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email: z.email(),
    password: z.string()
})
function LoginPage() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("validation passed , data:", data)
        router.push("/dashboard")

    }
    return (


        <>

            <Link href={"/"}>   <PersonStandingIcon size={50} /></Link>
            <Card className='w-full max-w-md  '>
                <CardHeader>
                    <CardTitle className='font-bold text-2xl mb-2'>
                        Login
                    </CardTitle>
                    <CardDescription>
                        Login to your SupportMe account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="email"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[{ message: "invalid Email" }]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            password
                                        </FieldLabel>
                                        <PasswordInput
                                            {...field}
                                            id="password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {/* <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/100 characters
                                                </InputGroupText>
                                            </InputGroupAddon> */}
                                        {!fieldState.invalid &&
                                            <FieldDescription>
                                                password : at least 8 characters , one Uppercase
                                            </FieldDescription>}
                                        {fieldState.invalid && (
                                            <FieldError errors={[{ message: "password : at least 8 characters , one Uppercase" }]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Button type="submit" >Sign up</Button>
                        </FieldGroup>

                    </form>
                </CardContent>

                <CardFooter className='justify-between'>
                    <small>Don't have an account ? </small>
                    <Button asChild variant={"outline"} size="sm">
                        <Link href="/signup">Sing up</Link>
                    </Button>
                </CardFooter>
            </Card >
        </>
    )
}

export default LoginPage