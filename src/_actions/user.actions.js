import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { fail } from 'assert';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getGroups,
    addBill,
    addGroup
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getGroups() {
    return dispatch => {
        dispatch(request());

        userService.getGroups()
            .then(
                groups => dispatch(success(groups)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: userConstants.GETGROUPS_REQUEST } }
    function success(groups) { return { type: userConstants.GETGROUPS_SUCCESS, groups } }
    function failure(error) { return { type: userConstants.GETGROUPS_FAILURE, error } }    
}

function addBill(group, amount) {
    return dispatch => {
        dispatch(request(group, amount));

        userService.addBill(group, amount)
            .then(
                add_bill => {
                    dispatch(success(add_bill));
                    dispatch(alertActions.success('Bill added successful'));
                },
                error => dispatch(failure(error.toString))
            )
    }

    function request() { return {type: userConstants.BILLADD_REQUEST}}
    function success(add_bill) {
        return (dispatch) => {
            dispatch(getAll())
        };
    }
    function failure(error) {return {type: userConstants.BILLADD_FAILURE, error}}
}


function addGroup(group_type, group_users, groupname) {
    return dispatch => {
        dispatch(request(group_type, group_users, groupname))

        userService.addGroup(group_type, group_users, groupname)
            .then(
                add_group => {
                    dispatch(success(add_group));
                    dispatch(alertActions.success('Group is added'))
                },
                error => dispatch(failure(error.toString))
            )
    }

    function request() { return {type: userConstants.ADDGROUP_REQUEST}}
    function success(add_group) {window.location = '/'}
    function failure(error) {return {type: userConstants.ADDGROUP_FAILURE, error}}
}
