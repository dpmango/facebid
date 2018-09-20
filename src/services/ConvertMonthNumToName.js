
const ConvertMonthNumToName = (str) => {
  const monthNames = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июня",
    "Июля", "Авг", "Сент", "Окт", "Нояб", "Дек"
  ];

  return monthNames[parseInt(str, 10) - 1]
}

export default ConvertMonthNumToName
