import {AxiosResponse} from "axios";

import {
    fetchChatParticipantRequest,
    fetchImagesRequest,
    fetchUserRequest,
    processSubscribeRequest,
    userProfileSaga
} from "../sagas";
import {
    fetchChatParticipant,
    fetchImages,
    fetchUserProfile,
    processSubscribe,
    setImages,
    setImagesLoadingStatus,
    setSubscribeToUserProfile,
    setUserProfile,
    setUserProfileLoadingState
} from "../actionCreators";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../../util/testHelper";
import {UserProfileResponse} from "../../../types/user";
import {UserApi} from "../../../../services/api/userApi";
import {ChatApi} from "../../../../services/api/chatApi";
import {TweetImageResponse} from "../../../types/tweet";
import {UserProfileActionsType} from "../contracts/actionTypes";
import {boolean} from "yup";
import {LoadingStatus} from "../../../types/common";

describe("userProfileSaga:", () => {
    const mockUserProfileResponse = {data: {id: 1}} as AxiosResponse<UserProfileResponse>;

    describe("fetchUserRequest:", () => {
        const worker = fetchUserRequest(fetchUserProfile(1));

        testLoadingStatus(worker, setUserProfileLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserInfo, 1);
        testSetResponse(worker, mockUserProfileResponse, setUserProfile, mockUserProfileResponse.data, "UserProfileResponse");
        testLoadingStatus(worker, setUserProfileLoadingState, LoadingStatus.ERROR)
    });

    describe("processSubscribeRequest:", () => {
        const mockResponse = {data: true} as AxiosResponse<boolean>;
        const worker = processSubscribeRequest(processSubscribe(1));

        testCall(worker, UserApi.processSubscribeToNotifications, 1);
        testSetResponse(worker, mockResponse, setSubscribeToUserProfile, mockResponse.data, "boolean");
        testLoadingStatus(worker, setUserProfileLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchChatParticipantRequest:", () => {
        const worker = fetchChatParticipantRequest(fetchChatParticipant({participantId: 1, chatId: 1}));

        testLoadingStatus(worker, setUserProfileLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.getParticipant, {participantId: 1, chatId: 1});
        testSetResponse(worker, mockUserProfileResponse, setUserProfile, mockUserProfileResponse.data, "UserProfileResponse");
        testLoadingStatus(worker, setUserProfileLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchImagesRequest:", () => {
        const mockTweetImageResponse = {data: [{tweetId: 1, imageId: 1}]} as AxiosResponse<TweetImageResponse[]>;
        const worker = fetchImagesRequest(fetchImages(1));

        testLoadingStatus(worker, setImagesLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserTweetImages, 1);
        testSetResponse(worker, mockTweetImageResponse, setImages, mockTweetImageResponse.data, "TweetImageResponse");
        testLoadingStatus(worker, setImagesLoadingStatus, LoadingStatus.ERROR)
    });

    testWatchSaga(userProfileSaga, [
        {actionType: UserProfileActionsType.FETCH_USER, workSaga: fetchUserRequest},
        {actionType: UserProfileActionsType.PROCESS_SUBSCRIBE, workSaga: processSubscribeRequest},
        {actionType: UserProfileActionsType.FETCH_CHAT_PARTICIPANT, workSaga: fetchChatParticipantRequest},
        {actionType: UserProfileActionsType.FETCH_IMAGES, workSaga: fetchImagesRequest},
    ]);
});
