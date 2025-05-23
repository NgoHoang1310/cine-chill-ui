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
  languages: '/languages',
  search: '/search',
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
