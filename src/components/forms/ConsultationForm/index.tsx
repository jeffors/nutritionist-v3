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
import { CheckCircle, Send } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
})

type formData = z.infer<typeof formSchema>

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      messenger: undefined,
      request: '',
      terms: false,
    },
  })

  const onSubmit = async (data: formData) => {
    console.log(data)
    setSubmitted(true)
  }

  const handleReset = () => {
    reset()
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-heading text-2xl mb-2">Заявка отправлена!</h3>
        <p className="text-gray-700 mb-6">Спасибо! Я свяжусь с вами в ближайшее время.</p>
        <Button onClick={handleReset} variant={'outline'}>
          Отправить ещё одну заявку
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <Link href="/privacy" className="text-green-600 underline hover:no-underline">
                Политикой конфидециальности
              </Link>{' '}
              и даю{' '}
              <Link href="/consent" className="text-green-600 underline hover:no-underline">
                согласие на обработку персональных данных
              </Link>
            </span>
          </FieldLabel>
        </Field>
        <FieldError errors={[errors.terms]} />
        <Field>
          <Button type="submit" size={'xl'} disabled={isSubmitting}>
            <Send></Send>
            {isSubmitting ? 'Отправляем...' : 'Записаться на консультацию'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
