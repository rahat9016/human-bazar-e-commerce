import { categoryConstants } from "../action/constance";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat.parentId && cat.parentId === parentId) {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  children: category.children,
                  parentId: category.parentId,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCategories;
};

export const categoryReducers = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS: {
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    }
    case categoryConstants.ADD_NEW_CATEGORIES_REQUEST: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS: {
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updatedCategories);
      state = {
        ...state,
        // categories: updatedCategories,
        loading: false,
      };
      break;
    }
    case categoryConstants.ADD_NEW_CATEGORIES_FAILURE: {
      state = {
        ...initState,
      };
      break;
    }
    default:
      return state;
  }
  return state;
};
