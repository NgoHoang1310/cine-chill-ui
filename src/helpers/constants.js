export const routes = {
  startNow: '/',
  signIn: '/sign-in',
  signUp: '/sign-up',
  recoverPassword: '/recover-password',
  recoverPasswordSuccess: '/recover-password/success',
  recoverPasswordCode: '/recover-password/:code',

  home: '/home',
  series: '/series',
  movies: '/movies',
  popular: '/popular',
  myList: '/my-list',
  watch: '/watch/:uuid',
  languages: '/languages',
  search: '/search',
  payment: '/payment',
  paymentResult: '/payment/return',
  plan: '/plans',
};

export const actions = {
  signUp: 'signUp',
  signIn: 'signIn',
  autoSignIn: 'autoSignIn',
  signInGoogle: 'signInGoogle',
  signInFacebook: 'signInFacebook',
  signInAnonymously: 'signInAnonymously',
  recoverPassword: 'recoverPassword',
  recoverPasswordWithEmail: 'recoverPasswordWithEmail',
  logout: 'logout',
  setUser: 'setUser',
  setLoading: 'setLoading',
  setGenres: 'setGenres',
  setConfiguration: 'setConfiguration',
  setError: 'setError',
  clearError: 'clearError',
  setMyList: 'setMyList',
  addMovieToMyList: 'addMovieToMyList',
  removeMovieFromMyList: 'removeMovieFromMyList',
};

export const CONTENT_TYPE = {
  MOVIE: 0,
  SERIES: 1,
}

export const QUALITIES = {
  0: {
    name: 'FUD',
    value: '1080p',
    description: 'Full HD',
  },
  1: {
    name: 'HD',
    value: '720p',
  },
  2: {
    name: 'SD',
    value: '480p',
  },
  'default': {
    name: 'Auto',
    value: 'Auto',
  }
}
