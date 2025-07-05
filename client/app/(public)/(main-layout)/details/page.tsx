const Details = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-auto">
        <span>Компания работает с юр лицами</span>
        <span>Скачать реквизиты</span>
        <span>
          Политики конфиденциальности и документы подтверждающие компанию
        </span>
        <ul>
          <li>Полное наименование:</li>
          <li>ИНН:</li>
          <li>ИНКППН:</li>
          <li>ОГРН:</li>
          <li>Юридический адрес:</li>
          <li>Фактический адрес:</li>
          <li>Телефон:</li>
          <li>Сайт:</li>
          <li>
            Банковские реквизиты:
            <ul>
              <li>Наименование банка:</li>
              <li>Расчетный счет:</li>
              <li>БИК:</li>
              <li>Кор/счет:</li>
              <li>Спецсчет:</li>
            </ul>
          </li>
          <li>
            Руководитель:
            <ul>
              <li>Генеральный директор:</li>
            </ul>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Details
