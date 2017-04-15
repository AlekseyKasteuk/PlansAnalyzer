module.exports = (state = {
  data: [],
  selected: null
}, action) => {

  let newState = {...state};

  switch (action.type) {
    case 'PRIVATE_SITES_ADD': {
      newState.data.push(action.data);
      break;
    }
    case 'PRIVATE_SITES_REMOVE': {
      var index = newState.data.map((site) => site.id).indexOf(action.data);
      if (index > -1) { newState.data.splice(index, 1); }
      break;
    }
    case 'PRIVATE_SITES_SET_DATA': {
      newState.data = action.data;
      break;
    }
    case 'PRIVATE_SITE_SELECT': {
      newState.selected = action.data;
      break;
    }
    case 'PRIVATE_SITE_UNSELECT': {
      newState.selected = null;
      break;
    }
  }

  console.log(newState);

  return newState;
}
