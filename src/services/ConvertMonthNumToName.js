
const ConvertMonthNumToName = (str) => {
  const monthNames = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июня",
    "Июля", "Авг", "Сент", "Окт", "Нояб", "Дек"
  ];

  return monthNames[parseInt(str) - 1]
}

export default ConvertMonthNumToName
