import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DialogFooter } from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Guide } from '@/payload-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import { createPaymentAction } from './actions'

const formSchema = z.object({
  guideId: z.number(),
  name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
  email: z.email('Введите корректный email'),
  terms: z.boolean().refine((val) => val === true, {
    error: 'Необходимо принять условия политики конфиденциальности',
  }),
})

interface GuideFormProps {
  guide: Guide
}

export type FormData = z.infer<typeof formSchema>

export default function GuideForm({ guide }: GuideFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      guideId: guide.id,
      name: '',
      terms: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)

    const result = await createPaymentAction(data)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.url) {
      window.location.href = result.url
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="input-name">Имя</FieldLabel>
            <Input id="input-name" type="text" placeholder="Ваше имя" {...register('name')}></Input>
            <FieldError errors={[errors.name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-email">Email</FieldLabel>
            <Input
              id="input-email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            ></Input>
            <FieldError errors={[errors.email]} />
          </Field>
          <Field orientation={'horizontal'}>
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="terms-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                ></Checkbox>
              )}
            />
            <FieldLabel htmlFor="terms-checkbox">
              <span>
                Я согласен(а) c{' '}
                <Link href="/offer" className="text-green-600 underline hover:no-underline">
                  Публичной офертой
                </Link>{' '}
                и{' '}
                <Link href="/privacy" className="text-green-600 underline hover:no-underline">
                  Политикой конфиденциальности
                </Link>
              </span>
            </FieldLabel>
          </Field>
          <FieldError errors={[errors.terms]} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </FieldGroup>

        <p className="text-center text-xs text-black/60 mt-4 mb-4">
          🔒 Безопасная оплата. После оплаты материал придёт на email.
        </p>
        <DialogFooter>
          <Button type="submit" className="w-full" size={'xl'} disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            {loading ? 'Создаём платёж...' : `Оплатить ${guide.price} ₽`}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
