import {selectFollowers, selectUsersPagesCount, selectUsersSearch, selectUsersSearchIsLoading} from "../selectors";
import {createMockRootState} from "../../../../util/testHelper";
import {mockUsers} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../types/common";

describe("usersSearch selectors:", () => {
    
    describe("selectUsersSearch", () => {
        it("should return UserResponse array", () => {
            expect(selectUsersSearch(createMockRootState())).toBe(mockUsers);
        });
    });

    describe("selectFollowers", () => {
        it("should return UserResponse array", () => {
            expect(selectFollowers(createMockRootState())).toBe(mockUsers);
        });
    });

    describe("selectUsersPagesCount", () => {
        it("should return pagesCount number", () => {
            expect(selectUsersPagesCount(createMockRootState())).toBe(1);
        });
    });

    describe("selectUsersSearchIsLoading", () => {
        it("should return correct result", () => {
            expect(selectUsersSearchIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
