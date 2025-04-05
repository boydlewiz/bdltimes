"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)

    toast({
      title: "Reset email sent",
      description: "Check your inbox for password reset instructions.",
    })
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-primary/10">
        <CardHeader className="space-y-1 bg-gradient-to-r from-primary/10 to-transparent border-b border-primary/10">
          <CardTitle className="text-3xl font-bold gradient-text">Check your email</CardTitle>
          <CardDescription>We've sent password reset instructions to your email address.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <p className="text-center text-muted-foreground">
            If you don't see the email in your inbox, please check your spam folder.
          </p>
          <Button asChild className="w-full ripple">
            <Link href="/login">Return to login</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-primary/5 dark:from-gray-900 dark:to-primary/10">
      <CardHeader className="space-y-1 bg-gradient-to-r from-primary/10 to-transparent border-b border-primary/10">
        <CardTitle className="text-3xl font-bold gradient-text">Forgot password?</CardTitle>
        <CardDescription>Enter your email address and we'll send you a link to reset your password</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      {...field}
                      className="border-primary/20 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full ripple" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-primary/10 bg-primary/5">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

