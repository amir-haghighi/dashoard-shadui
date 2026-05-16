import z from "zod";

const baseSchema = z.object({
    email: z.email(),
    birthDate: z.date("required").refine((date: Date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDay()
        )
        return date <= eighteenYearsAgo
    }, "You must be at least 18 years old!"),
    acceptTerms: z.boolean().refine((checked) => checked, "You must accept the terms and conditions")
})

const accountSchema = z.object({
    accountType: z.enum(["personal", "company"], "required"),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),

}).superRefine(
    (data, ctx) => {
        if (data.accountType === "company" && !data.companyName) {
            ctx.addIssue(
                {
                    code: "custom",
                    path: ["companyName"],
                    message: "company name is required!"
                }
            )
        };
        if (data.accountType === "company" && (!data.numberOfEmployees || data?.numberOfEmployees <= 0)) {
            ctx.addIssue(
                {
                    code: "custom",
                    path: ["numberOfEmployees"],
                    message: "number of employees is required!"
                }
            )
        }
    }
)

const passwordSchema = z.object({
    password: z.string("required").min(8, "password must contain at least 8 characters").refine((password) => {

        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password)
    }, "Password must contain at least 1 special character and 1 uppercase letter"),
    passwordConfirm: z.string("Does not match the password !")

}).superRefine(
    (data, ctx) => {
        if (data.passwordConfirm !== data.password) {
            ctx.addIssue(
                {
                    code: "custom",
                    path: ["passwordConfirm"],
                    message: "The confirm password dose not match the password"
                }
            )
        }
    }

)

export const formSchema = baseSchema.and(accountSchema).and(passwordSchema)