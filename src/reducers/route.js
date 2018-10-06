import { REMEMBER_ROUTE, REDIRECT_ROUTE_START, RESET_ROUTE } from 'actions/route';

const initialState = {
  prevRoute: '',
  startRedirect: false
}

const route = (state = initialState, action) => {
  switch (action.type) {

    case REMEMBER_ROUTE:
      return {
        ...state,
        prevRoute: action.payload
      }
    case REDIRECT_ROUTE_START:
      return {
        ...state,
        startRedirect: true
      }
    case RESET_ROUTE:
      return initialState

    default:
      return state;
  }
}

export default route;
