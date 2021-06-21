import {call, put, takeLatest} from 'redux-saga/effects';

import {setUpdatedUserData, setUserData, setUserLoadingStatus} from "./actionCreators";
import {AuthUser, User} from "./contracts/state";
import {
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    UpdateUserDataActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {AuthApi} from "../../../services/api/authApi";
import {LoadingStatus} from "../../types";

export function* fetchSignInRequest({payload}: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.signIn, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        yield call(AuthApi.signUp, payload);
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.getMe);
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUpdateUserDataRequest({payload}: UpdateUserDataActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: User = yield call(AuthApi.updateUserProfile, payload);
        yield put(setUpdatedUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userSaga() {
    yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
    yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
    yield takeLatest(UserActionsType.UPDATE_USER_DATA, fetchUpdateUserDataRequest);
}
