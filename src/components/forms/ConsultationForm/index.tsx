'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
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

export default function ConsultationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-heading text-2xl mb-2">Заявка отправлена!</h3>
        <p className="text-gray-700 mb-6">Спасибо! Я свяжусь с вами в ближайшее время.</p>
        <Button onClick={() => setSubmitted(false)} variant={'outline'}>
          Отправить ещё одну заявку
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="input-name">Имя</FieldLabel>
          <Input id="input-name" type="text" placeholder="Ваше имя"></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-phone">Телефон</FieldLabel>
          <Input id="input-phone" type="tel" placeholder="+7 (___) ___-__-__"></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-email">Email</FieldLabel>
          <Input id="input-email" type="email" placeholder="your@email.com"></Input>
        </Field>
        <Field>
          <FieldLabel>Мессенджер</FieldLabel>
          <Select name="messenger">
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
        </Field>
      </FieldGroup>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="request-input">Краткий запрос</FieldLabel>
          <Textarea
            id="request-input"
            placeholder="Расскажите коротко о вашем запросе (цель, проблема, пожелания)..."
            name="request-input"
          ></Textarea>
        </Field>
        <Field orientation={'horizontal'}>
          <Checkbox id="terms-checkbox" name="terms-checkbox"></Checkbox>
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
