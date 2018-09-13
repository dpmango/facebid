import moment from 'moment';
// import moment from 'moment/min/moment-with-locales'
import "moment/locale/ru"

const ConvertTimestampToStr = (time) => {
  moment.locale("ru");
  const mDate = moment(time)

  console.log(mDate)
  return mDate.fromNow()
}

export default ConvertTimestampToStr
