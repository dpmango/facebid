import React, {Component} from 'react';
import moment from 'moment';
import ConvertMonthNumToName from '../../services/ConvertMonthNumToName';

class EventCardDate extends Component {

  constructor(){
    super()

    this.state = {
      date: null,
      month: null,
      isTomorrow: false
    }
  }

  componentDidMount(){
    const d = moment(this.props.date)

    const day   = d.format('D');
    const month = ConvertMonthNumToName(d.format('M'));

    //get date difference
    const curD = moment().format("YYYY-MM-DD")
    const difference = d.diff(curD, 'days')
    const isTomorrow = difference === 1

    this.setState({
      date: day,
      month: month,
      isTomorrow: isTomorrow
    })
  }

  render(){
    const {
      state: {date, month, isTomorrow},
      props: {baseClass}
    } = this

    return(
      <div className={"card-date " + (baseClass) + (isTomorrow ? " is-tomorrow" : "")}>
        <div className="card-date__wrapper">
          <div className="card-date__content">
            <span>{date}</span>
            <span>{month}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default EventCardDate
