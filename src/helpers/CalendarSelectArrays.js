export const daySelect = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09",
  "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
  "30", "31"
]

export const monthSelect =[
  {value: "01", label: "Января"},
  {value: "02", label: "Ферваля"},
  {value: "03", label: "Марта"},
  {value: "04", label: "Апреля"},
  {value: "05", label: "Мая"},
  {value: "06", label: "Июня"},
  {value: "07", label: "Июля"},
  {value: "08", label: "Августа"},
  {value: "09", label: "Сентября"},
  {value: "10", label: "Октября"},
  {value: "11", label: "Ноября"},
  {value: "12", label: "Декабря"}
]

export const yearSelect = Array(2010 - 1940 + 1).fill().map((_, idx) => 2010 - idx)
