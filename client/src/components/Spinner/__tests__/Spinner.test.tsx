import React from "react";

import {createMockRootState, mountWithStore} from "../../../util/testHelper";
import Spinner from "../Spinner";
import {LoadingStatus} from "../../../store/types/common";

describe("Spinner", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);

    it("should render Spinner with padding", () => {
        const wrapper = mountWithStore(<Spinner paddingTop={50}/>, mockRootState);
        expect(wrapper.find("svg").exists()).toBeTruthy();
    });
    
    it("should render Spinner without padding", () => {
        const wrapper = mountWithStore(<Spinner />, mockRootState);
        expect(wrapper.find("svg").exists()).toBeTruthy();
    });
});
