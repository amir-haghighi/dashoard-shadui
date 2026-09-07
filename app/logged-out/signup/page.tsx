"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, PersonStandingIcon } from 'lucide-react'
import { Controller, useForm } from "react-hook-form"
import Link from 'next/link'
import * as z from "zod"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { formSchema } from '@/components/signup/FormSchema'
import { PasswordInput } from '@/components/ui/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'


function SignupPage() {
    const router = useRouter()
    const form = useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            companyName: "",
            numberOfEmployees: undefined
        }
    })
    const onSubmit = (data: z.output<typeof formSchema>) => {
        console.log("validation passed , data:", data);
        router.push("/")
    }
    const accountType = form.watch("accountType")

    return (


        <>

            <Link href={"/"}> <PersonStandingIcon size={50} /></Link>
            <Card className='w-full max-w-md  '>
                <CardHeader>
                    <CardTitle className='font-bold text-2xl mb-2'>
                        Signup
                    </CardTitle>
                    <CardDescription>
                        Signup for a new SupportMe account
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
                                name="accountType"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Account type</FieldLabel>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger aria-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Select an account type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="personal">personal</SelectItem>
                                                    <SelectItem value="company">company</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            {
                                accountType === "company" &&
                                <>
                                    <Controller
                                        name="companyName"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="companyName">
                                                    Company Name
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    id="companyName"
                                                    aria-invalid={fieldState.invalid}
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        name="numberOfEmployees"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="numberOfEmployees">
                                                    Number of Employees
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    value={(field.value as number | string | undefined) ?? ""}
                                                    type='number'
                                                    id="numberOfEmployees"
                                                    aria-invalid={fieldState.invalid}
                                                    autoComplete="off"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </>
                            }
                            <Controller
                                name="birthDate"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    const yearsAgo = new Date()
                                    yearsAgo.setFullYear(yearsAgo.getFullYear() - 120)
                                    return (

                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="birthDate">
                                                Date of birth
                                            </FieldLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>

                                                    <Button variant={"outline"} className='normal-case  flex justify-between pr-2'>
                                                        <span> {field.value
                                                            ? format(field.value, "PPP")
                                                            : "Pick a date"}</span>
                                                        <CalendarIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className='flex items-center justify-center ' align='start'>
                                                    <Calendar
                                                        mode="single"
                                                        defaultMonth={field.value ?? new Date()}
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        fixedWeeks
                                                        weekStartsOn={6}
                                                        captionLayout="dropdown"
                                                        startMonth={yearsAgo}
                                                        disabled={[
                                                            {
                                                                before: yearsAgo,
                                                                after: new Date(),
                                                            }

                                                        ]}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <PasswordInput
                                            {...field}
                                            id="password"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="passwordConfirm"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="passwordConfirm">
                                            Confirm Password
                                        </FieldLabel>
                                        <PasswordInput
                                            {...field}
                                            id="passwordConfirm"
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="acceptTerms"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <FieldGroup className="">
                                        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                id="acceptTerms"
                                                name="acceptTerms"
                                                aria-invalid={fieldState.invalid}
                                            />
                                            <FieldLabel htmlFor="acceptTerms">
                                                Accept terms and conditions
                                            </FieldLabel>
                                        </Field>
                                        <FieldDescription >
                                            By signing up , you agree to the <Link className='text-primary' href="/terms" >terms and conditions </Link>
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </FieldGroup>
                                )}
                            />
                            <Button type="submit" >Sign up</Button>
                        </FieldGroup>

                    </form>
                </CardContent>

                <CardFooter className='justify-between'>
                    <small>Already have an account ? </small>
                    <Button asChild variant={"outline"} size="sm">
                        <Link href="/logged-out/login">Log in</Link>
                    </Button>
                </CardFooter>
            </Card >
        </>
    )
}

export default SignupPage