'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Loader2, Send } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitConsultation } from './actions'
import { SmartCaptcha } from '@yandex/smart-captcha'
import { redirect } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
  phone: z
    .string()
    .min(1, 'Введите номер телефона')
    .regex(/^\+?[\d\s\-()]{10,}$/, 'Введите корректный номер телефона'),
  email: z.email('Введите корректный email'),
  messenger: z.enum(['whatsapp', 'telegram'], 'Выберите мессенджер'),
  request: z.string().min(20, 'Запрос должен иметь больше 20 символов'),
  terms: z.boolean().refine((val) => val === true, {
    error: 'Необходимо принять условия политики конфиденциальности',
  }),
  captchaToken: z.string().min(1, 'Пожалуйста, подтвердите, что вы не робот'),
})

export type FormData = z.infer<typeof formSchema>

interface FormProps {
  guideName?: string
  compact?: boolean
}

export default function ConsultationForm({ guideName, compact }: FormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [captchaResetKey, setCaptchaResetKey] = useState(0)

  const requestText = guideName ? `Хочу получить полный гайд по "${guideName}" на месяц` : ''
  const submitText = guideName ? 'Заказать гайд' : 'Записаться на консультацию'

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      messenger: undefined,
      request: requestText,
      terms: false,
      captchaToken: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    const result = await submitConsultation(data)

    if (result.success) {
      setSubmitted(true)
      setError(null)
    } else {
      setError(result.error || 'Что-то пошло не так')
      setCaptchaResetKey((prev) => prev + 1)
    }
  }

  const handleReset = () => {
    reset()
    setSubmitted(false)
    setError(null)
    setCaptchaResetKey((prev) => prev + 1)
    if (guideName) {
      redirect('/')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-heading text-2xl mb-2">
          {guideName ? 'Заявка на заказ отправлена!' : 'Заявка отправлена!'}
        </h3>
        <p className="text-gray-700 mb-6">Спасибо! Я свяжусь с вами в ближайшее время.</p>
        <Button onClick={handleReset} variant={'outline'}>
          {guideName ? 'Вернуться на главную страницу' : 'Отправить ещё одну заявку'}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup
        className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}
      >
        <Field>
          <FieldLabel htmlFor="input-name">Имя</FieldLabel>
          <Input id="input-name" type="text" placeholder="Ваше имя" {...register('name')}></Input>
          <FieldError errors={[errors.name]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-phone">Телефон</FieldLabel>
          <Input
            id="input-phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            {...register('phone')}
          ></Input>
          <FieldError errors={[errors.phone]} />
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
        <Field>
          <FieldLabel>Мессенджер</FieldLabel>
          <Controller
            name="messenger"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите мессенджер"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Мессенджер</SelectLabel>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.messenger]} />
        </Field>
      </FieldGroup>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="request-input">Краткий запрос</FieldLabel>
          <Textarea
            id="request-input"
            placeholder="Расскажите коротко о вашем запросе (цель, проблема, пожелания)..."
            {...register('request')}
          ></Textarea>
          <FieldError errors={[errors.request]} />
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
              <Link
                href="/privacy"
                className="text-green-600 underline transition-colors hover:text-green-500"
              >
                Политикой конфидециальности
              </Link>{' '}
              и даю{' '}
              <Link
                href="/consent"
                className="text-green-600 underline transition-colors hover:text-green-500"
              >
                согласие на обработку персональных данных
              </Link>
            </span>
          </FieldLabel>
        </Field>
        <FieldError errors={[errors.terms]} />
        <Field>
          <Controller
            name="captchaToken"
            control={control}
            render={({ field }) => (
              <SmartCaptcha
                sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_CLIENT_KEY || ''}
                key={captchaResetKey}
                onSuccess={(token) => field.onChange(token)}
                onTokenExpired={() => field.onChange('')}
              />
            )}
          ></Controller>
        </Field>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Field>
          <Button type="submit" size={'xl'}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSubmitting ? 'Отправляем...' : submitText}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
