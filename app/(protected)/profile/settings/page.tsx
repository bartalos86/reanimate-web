'use client'

import { startTransition, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User2, Mail, Key, Settings } from 'lucide-react'
import { ProfileFormSchema, ProfileFormValues } from '@/schemas'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { reset } from '@/actions/reset'
import { useState } from 'react'
import { logout } from '@/actions/logout'
import { updateProfileInfo } from '@/actions/update-profile'

export default function ProfileSettingsPage() {
  const { data: session, status } = useSession()
  const provider: 'credentials' | 'google' | 'github' = 'credentials'
  const isEditable = provider === 'credentials'
  const [isResetting, setIsResetting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const avatarUrl = session?.user?.image;
  // Default values from session
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: session?.user?.name || '',
    },
  })

  // Reset form when session loads
  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session.user.name || '',
      })
    }
  }, [session, form])

  const onSubmit = (values: ProfileFormValues) => {
    startTransition(() => {
      updateProfileInfo(values).then(resp => {
        if(resp.error){
          setMessage({
            type: 'error',
            message: resp.error
          })
        }else if(resp.success){
          setMessage({
            type: 'success',
            message: resp.success
          })
        }
      })
    })
  }

  const handleResetPassword = async () => {
    if (!session?.user?.email) return

    try {
      setIsResetting(true)
      setMessage(null)

      const result = await reset({
        email: session.user.email
      })

      if (result?.error) {
        setMessage({
          type: 'error',
          message: result.error
        })
      } else {
        setMessage({
          type: 'success',
          message: 'Password reset email sent. Please check your inbox.'
        })
        setTimeout(() => {
          logout()
        }, 5000);
      }
    } catch {
      setMessage({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      })
    } finally {
      setIsResetting(false)
    }
  }

  if (status === 'loading') return <div className="text-center p-8">Loading…</div>
  if (!session) return <div className="text-center p-8">Please sign in to view this page.</div>

  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1)

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Settings className="w-8 h-8 text-orange-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture Card */}
          <Card className="md:col-span-1 bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={avatarUrl || '/placeholder-avatar.jpg'} />
                    <AvatarFallback className="bg-orange-100 text-orange-700 text-4xl">
                      {session.user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900">{session.user?.name}</h2>
                  <p className="text-sm text-gray-500">{session.user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Settings Card */}
          <Card className="md:col-span-2 bg-white">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>
                {isEditable
                  ? 'Update your account information below.'
                  : `Managed by ${providerName}.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {message && (
                    <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {message.message}
                    </div>
                  )}

                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
                          <div className="relative">
                            <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <FormControl>
                              <Input
                                disabled={!isEditable}
                                className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Email Display (not editable) */}
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="email"
                        value={session?.user?.email || ''}
                        disabled={true}
                        className="pl-10 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Password Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Password</h3>
                    {!isEditable ? (
                      <div className="text-sm text-gray-500 italic">
                        Password management is handled by {providerName}. Please update your password through your {providerName} account settings.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleResetPassword}
                            disabled={isResetting}
                            className="flex items-center space-x-2"
                          >
                            <Key className="h-4 w-4" />
                            <span>{isResetting ? 'Sending...' : 'Reset Password'}</span>
                          </Button>
                          <p className="text-sm text-gray-500">
                            Click to reset your password. You will receive an email with instructions.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      type="submit"
                      disabled={!isEditable}
                      className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
                    >
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => signOut()}>
                      Sign Out
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
