export const OPEN_ONBOARDING = 'OPEN_ONBOARDING';
export const CLOSE_ONBOARDING = 'CLOSE_ONBOARDING';
export const SET_ONBOARDING_STEP = 'SET_ONBOARDING_STEP';

export const setOnboardingStep = (data) => ({
  type: SET_ONBOARDING_STEP,
  payload: data
})

export const openOnboarding = () => ({
  type: OPEN_ONBOARDING
})

export const closeOnboarding = () => ({
  type: CLOSE_ONBOARDING
})
