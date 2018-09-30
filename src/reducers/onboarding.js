import { OPEN_ONBOARDING, CLOSE_ONBOARDING, SET_ONBOARDING_STEP } from 'actions/onboarding';

const initialState = {
  isActive: false,
  onboardingStep: 1
}

const onboarding = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ONBOARDING:
      return {
        ...state,
        isActive: true
      }
    case CLOSE_ONBOARDING:
      return {
        ...state,
        isActive: false
      }
    case SET_ONBOARDING_STEP:
      return {
        ...state,
        onboardingStep: action.payload
      }

    default:
      return state;
  }
}

export default onboarding;
