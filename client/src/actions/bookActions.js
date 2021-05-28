import {
  BOOK_SELECTED,
  BOOK_NEXT_CLICKED,
  BOOK_PREV_CLICKED,
} from '../constants/bookConstants'

export const setSelectedBook = (selectedBook) => {
  console.log('selectedBook', selectedBook)
  return { type: BOOK_SELECTED, bookSelected: selectedBook }
}

export const setPrevClickedBook = (data) => {
  console.log('prev clicked', data)
  return { type: BOOK_PREV_CLICKED, prevClicked: data }
}
export const setNextClickedBook = (data) => {
  console.log('next clicked', data)
  return { type: BOOK_NEXT_CLICKED, nextClicked: data }
}
