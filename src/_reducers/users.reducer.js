import { userConstants } from '../_constants';
import { userActions } from '../_actions';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true,
        groups: state.groups
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users,
        groups: state.groups
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.GETGROUPS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETGROUPS_SUCCESS:
      return {
        items: state.items,
        groups: action.groups
      };
    case userConstants.GETGROUPS_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.BILLADD_REQUEST:
      return {
        loading: true,
        items: state.items,
        groups: state.groups
      };
    case userConstants.BILLADD_SUCCESS:
      return {
        items: state.items,
        groups: state.groups
      };
    case userConstants.BILLADD_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.ADDGROUP_REQUEST:
      return {
        items: state.items,
        groups: state.groups,
        loading: true
      };
    case userConstants.ADDGROUP_SUCCESS:
      return {
        items: state.items,
        groups: state.groups
      };
    case userConstants.ADDGROUP_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}