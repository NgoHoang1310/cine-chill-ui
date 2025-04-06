import { defineStore } from 'pinia';

export const useMyListStore = defineStore('myList', {
  state: () => ({
    myList: [],
  }),
  actions: {
    setMyList(payload) {
      this.myList = payload;
    },
    addMovieToMyList(payload) {
      this.setMyList([payload.movie, ...this.myList]);
    },
    removeMovieFromMyList(payload) {
      this.setMyList(this.myList.filter(({ id }) => id !== payload.movie.id));
    },
  },
  getters: {
    myList: (state) => state.myList,
  },
});