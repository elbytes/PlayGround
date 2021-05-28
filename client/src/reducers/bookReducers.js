import {
  BOOK_SELECTED,
  BOOK_PREV_CLICKED,
  BOOK_NEXT_CLICKED,
} from '../constants/bookConstants'

const initState = { bookSelected: '' }

export const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case BOOK_SELECTED:
      return { ...state, bookSelected: action.bookSelected }
    case BOOK_PREV_CLICKED:
      return { ...state, prevClicked: action.data }
    case BOOK_NEXT_CLICKED:
      return { ...state, nextClicked: action.data }
    default:
      return state
  }
}
