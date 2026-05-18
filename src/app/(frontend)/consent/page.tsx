export default async function Consent() {
  return (
    <>
      <div className="pt-20 py-15 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-60 h-1 bg-green-500 mb-4"></div>
          <h1 className="font-heading text-4xl text-black font-light mb-8">
            Согласие на обработку персональных данных
          </h1>
          <div className="text-gray-500 text-sm mb-8">Последнее обновление: 1 июня 2026 года</div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
            <div className="text-black/80 text-sm leading-relaxed">
              Настоящим я, субъект персональных данных (далее — «Пользователь»), предоставляю своё
              согласие ИП Галимовой Ларисе Леонидовне (далее — «Оператор») на обработку моих
              персональных данных на условиях, изложенных ниже.
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">1. Оператор</h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              ИП Галимова Лариса Леонидовна
              <br />
              Email: larisa.galimova@example.com
              <br />
              Телефон: +7 (900) 123-45-67
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">
              2. Перечень персональных данных
            </h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              Пользователь даёт согласие на обработку следующих персональных данных:
              <br />
              • Фамилия, имя, отчество
              <br />
              • Адрес электронной почты (email)
              <br />
              • Номер телефона
              <br />
              • Данные для связи в мессенджерах (WhatsApp, Telegram)
              <br />• Иные данные, добровольно предоставленные Пользователем
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">3. Цели обработки</h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              Персональные данные обрабатываются в целях:
              <br />
              • Организации и проведения консультаций
              <br />
              • Оказания услуг нутрициолога
              <br />
              • Выдачи приобретённых цифровых продуктов
              <br />
              • Информирования о записи, переносе, результатах
              <br />
              • Направления ответов на обращения Пользователя
              <br />
              • Улучшения качества оказываемых услуг
              <br />• Направления информационных и образовательных материалов
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">4. Способы обработки</h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              Обработка персональных данных осуществляется следующими способами:
              <br />
              • Сбор, запись, систематизация
              <br />
              • Накопление, хранение, уточнение
              <br />
              • Использование, передача (с ограничениями, указанными в Политике конфиденциальности)
              <br />
              • Обезличивание, блокирование, удаление, уничтожение
              <br />
              <br />
              Обработка осуществляется с использованием средств автоматизации и без таковых.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">
              5. Срок действия согласия
            </h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              Настоящее согласие действует с момента его предоставления до момента его отзыва.
              Пользователь вправе в любое время отозвать настоящее согласие, направив письменное
              уведомление Оператору на адрес: larisa.galimova@example.com.
              <br />
              <br />В случае отзыва согласия Оператор прекращает обработку персональных данных и
              уничтожает их в срок не позднее 30 дней с момента получения уведомления (за
              исключением случаев, когда обработка предусмотрена законом).
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">
              6. Передача третьим лицам
            </h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              Персональные данные не передаются третьим лицам без согласия Пользователя, за
              исключением случаев, предусмотренных законодательством РФ, и передачи платёжным
              сервисам для проведения оплаты.
            </p>
          </div>
          <div className="mb-8">
            <h2 className="font-serif text-2xl text-black font-light mb-3">
              7. Права Пользователя
            </h2>
            <p className="text-text/80 text-sm leading-relaxed whitespace-pre-line">
              Пользователь имеет право:
              <br />
              • Получать информацию об обрабатываемых персональных данных
              <br />
              • Требовать уточнения, исправления или удаления данных
              <br />
              • Отозвать настоящее согласие
              <br />
              • Обратиться с жалобой в Роскомнадзор (rkn.gov.ru)
              <br />
              <br />
              Для реализации прав: larisa.galimova@example.com
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 mt-8">
            <p className="text-black/70 text-sm leading-relaxed">
              <strong>Обратите внимание:</strong> При заполнении любой формы на данном сайте и
              нажатии кнопки «Записаться на консультацию» или «Отправить», вы подтверждаете, что
              ознакомились с настоящим Согласием и принимаете его условия.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
