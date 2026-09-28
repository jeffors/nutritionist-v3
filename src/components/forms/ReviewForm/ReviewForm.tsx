'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Loader2, Send, Star, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitReview } from './actions'
import { SmartCaptcha } from '@yandex/smart-captcha'
import Image from 'next/image'

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать не менее 2 символов'),
  age: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 100), {
      message: 'Введите корректный возраст (от 1 до 100)',
    }),
  location: z.string().optional(),
  service: z.string().optional(),
  stars: z.number().min(1, 'Выберите оценку').max(5),
  text: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    error: 'Необходимо принять условия политики конфиденциальности',
  }),
  captchaToken: z.string().min(1, 'Пожалуйста, подтвердите, что вы не робот'),
})

export type ReviewFormData = z.infer<typeof formSchema>

interface ReviewFormProps {
  compact?: boolean
}

export default function ReviewForm({ compact }: ReviewFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [captchaResetKey, setCaptchaResetKey] = useState(0)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [hoverStars, setHoverStars] = useState<number>(0)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      location: '',
      service: '',
      stars: 5,
      text: '',
      terms: false,
      captchaToken: '',
    },
  })

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const maxMB = 5
      if (file.size > maxMB * 1024 * 1024) {
        alert(`Размер файла не должен превышать ${maxMB} MB`)
        e.target.value = ''
        return
      }
      setPhotoFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleRemovePhoto = () => {
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  const onSubmit = async (data: ReviewFormData) => {
    const formData = new FormData()
    formData.append('data', JSON.stringify(data))
    if (photoFile) {
      formData.append('photo', photoFile)
    }

    const result = await submitReview(formData)

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
    setPhotoFile(null)
    setPhotoPreview(null)
    setSubmitted(false)
    setError(null)
    setCaptchaResetKey((prev) => prev + 1)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-heading text-2xl mb-2">Отзыв успешно отправлен!</h3>
        <p className="text-gray-700 mb-6">
          Спасибо за ваш отзыв. Он появится на сайте сразу после проверки модератором.
        </p>
        <Button onClick={handleReset} variant={'outline'}>
          Отправить ещё один отзыв
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field>
        <FieldLabel>Ваша оценка *</FieldLabel>
        <Controller
          name="stars"
          control={control}
          render={({ field }) => (
            <div className="flex gap-1 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => field.onChange(star)}
                  onMouseEnter={() => setHoverStars(star)}
                  onMouseLeave={() => setHoverStars(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= (hoverStars || field.value)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-100 text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        />
        <FieldError errors={[errors.stars]} />
      </Field>

      <FieldGroup
        className={compact ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}
      >
        <Field>
          <FieldLabel htmlFor="input-name">Имя *</FieldLabel>
          <Input id="input-name" type="text" placeholder="Ваше имя" {...register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="input-service">Услуга / Программа</FieldLabel>
          <Input
            id="input-service"
            type="text"
            placeholder="Например: Сопровождение"
            {...register('service')}
          />
          <FieldError errors={[errors.service]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="input-age">Возраст</FieldLabel>
          <Input id="input-age" type="number" placeholder="25" {...register('age')} />
          <FieldError errors={[errors.age]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="input-location">Город</FieldLabel>
          <Input id="input-location" type="text" placeholder="Москва" {...register('location')} />
          <FieldError errors={[errors.location]} />
        </Field>
      </FieldGroup>

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="text-input">Ваш отзыв</FieldLabel>
          <Textarea
            id="text-input"
            placeholder="Расскажите подробнее о ваших впечатлениях..."
            {...register('text')}
          />
          <FieldError errors={[errors.text]} />
        </Field>

        <Field>
          <FieldLabel>Прикрепить фото к отзыву</FieldLabel>
          {photoPreview ? (
            <div className="relative h-128 rounded-xl overflow-hidden border border-gray-200 mt-1">
              <Image src={photoPreview} alt="Превью" fill className="object-cover" />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 border border-dashed rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-fit">
              <Upload className="w-4 h-4 text-gray-500" />
              <span>Выберите изображение</span>
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          )}
        </Field>

        <Field orientation={'horizontal'}>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="review-terms-checkbox"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />

          <FieldLabel htmlFor="review-terms-checkbox">
            <span>
              Я согласен(а) c{' '}
              <Link
                href="/privacy"
                className="text-green-600 underline transition-colors hover:text-green-500"
              >
                Политикой конфиденциальности
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
          />
          <FieldError errors={[errors.captchaToken]} />
        </Field>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Field>
          <Button type="submit" size={'xl'}>
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isSubmitting ? 'Отправляем...' : 'Отправить отзыв'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
