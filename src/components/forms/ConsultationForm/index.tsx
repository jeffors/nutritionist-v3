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
import { Send } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'

export default function ConsultationForm() {
  return (
    <Form action={''}>
      <FieldGroup>
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
          <Select>
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
        <Field>
          <FieldLabel htmlFor="request-input">Краткий запрос</FieldLabel>
          <Textarea
            id="request-input"
            placeholder="Расскажите коротко о вашем запросе (цель, проблема, пожелания)..."
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
          <Button type="submit">
            <Send></Send>Записаться на консультацию
          </Button>
        </Field>
      </FieldGroup>
    </Form>
  )
}
