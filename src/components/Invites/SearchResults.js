import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import api from 'services/Api';
// import SvgIcon from '../Helpers/SvgIcon';
import FiltersCore from 'components/Events/FiltersCore';
import Loading from 'components/Helpers/Loading';
import InviteCard from './InviteCard';
import { setFilterParams } from 'actions/event-filter';

class SearchResults extends Component {
  constructor(props){
    super(props)

    this.initialState = {
      ...props.eventFilterRedux,
      // selectedId: null, // to passed from props
      people: []
    }

    // {
    //   eventName: props.eventFilterRedux.eventName,
    //   gender: props.eventFilterRedux.gender,
    //   range: props.eventFilterRedux.range,
    //   age: props.eventFilterRedux.age,
    //   languages: props.eventFilterRedux.languages,
    // }

    this.state = this.initialState
  }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if (nextProps.selected !== prevState.selectedId) {
  //     return { selectedId: nextProps.selected};
  //   } else {
  //     return null;
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected){
      if ( this.props.selected ){ // if some value is passed
        this.getPeopleList()
      } else {
        this.clearPeopleList()
      }
    }
  }

  getPeopleList = () => {
    api
      .get("invitePeople")
      .then(res => {
        this.setState({people: res.data})
      })
      .catch(err => {
        console.log("error on GET invitePeople", err)
      })
  }

  clearPeopleList = () => {
    this.setState({people: []})
  }

  // filer functions
  clearFiltersClick = () => {
    this.setState(this.initialState)
  }

  // select functions
  handleSelectChange = (value, name) => {
    this.setState({ [name]: value })
  }

  // slider functions
  rangeSliderChange = (name) => (val) => {
    this.setState({
      [name]: val
    })
  };


  render(){
    const {
      state: {
        gender, range, age, languages, people
      },
      props: {selected}
    } = this

    return(
      <div className="events">
        <div className="events__header">
          <h3 className="h3-title">Результаты поиска</h3>
          <div className="events__header-total">Найдено 628 человек</div>
        </div>

        {/* change to core filter */ }
        <div className={"filters"}>
          <FiltersCore
            gender={gender}
            range={range}
            age={age}
            languages={languages}
            onSelectChange={this.handleSelectChange}
            onRangeChange={this.rangeSliderChange}
            onClearFiltersClick={this.clearFiltersClick} />
        </div>

        <div className="invite-grid">
          {people.length === 0 &&
            <Loading type="invites" />
          }
          {people.length > 0 && people.map(x => (
            <div key={x.id} className="invite-grid__col">
              <InviteCard
                id={x.id}
                images={x.images}
                user={x.user} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

SearchResults.propTypes = {
  eventFilterRedux: PropTypes.object,
  setFilterParams: PropTypes.func,
  openModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  eventFilterRedux: state.eventFilter
});

const mapDispatchToProps = (dispatch) => ({
  setFilterParams: (data) => dispatch(setFilterParams(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
