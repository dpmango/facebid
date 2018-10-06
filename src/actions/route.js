export const REMEMBER_ROUTE = 'REMEMBER_ROUTE';
export const REDIRECT_ROUTE_START = 'REDIRECT_ROUTE_START';
export const RESET_ROUTE = 'RESET_ROUTE';

export const rememberRoute = (data) => ({
  type: REMEMBER_ROUTE,
  payload: data
})

export const redirectRouteStart = () => ({
  type: REDIRECT_ROUTE_START
})

export const resetRoute = () => ({
  type: RESET_ROUTE
})
