import React from "react";
import routeData from "react-router";

import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../../store/types/common";
import AddTweetImage from "../AddTweetImage";
import {ImageObj} from "../../AddTweetForm";
import {MODAL} from "../../../../util/pathConstants";

describe("AddTweetImage", () => {
    const mockStore = createMockRootState(LoadingStatus.SUCCESS);
    const mockImages = [{src: "test", file: new File([""], "filename", {type: "text/html"})}] as ImageObj[];

    it("should render default image", () => {
        mountWithStore(<AddTweetImage images={mockImages} removeImage={jest.fn()}/>, mockStore);
    });

    it("should render small image", () => {
        jest.spyOn(routeData, "useLocation").mockReturnValue({
            pathname: MODAL, hash: "", search: "", state: undefined
        });
        mountWithStore(<AddTweetImage images={mockImages} removeImage={jest.fn()}/>, mockStore);
    });

    it("should render empty component", () => {
        mountWithStore(<AddTweetImage images={[]} removeImage={jest.fn()}/>, mockStore);
    });
});
