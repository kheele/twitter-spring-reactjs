import React from "react";
import {Avatar, Button, Dialog} from "@material-ui/core";

import ProfileHeaderModal from "../ProfileHeaderModal";
import {createMockRootState, mountWithStore} from "../../../../util/testHelper";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {wallpapers} from "../../../../util/wallpapers";
import {LoadingStatus} from "../../../../store/types/common";

describe("ProfileHeaderModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    const mockImage = {
        src: wallpapers[0],
        file: new File([""], "test_filename", {type: "text/html"})
    };

    it("should render empty ProfileDescriptionModal", () => {
        const wrapper = mountWithStore(
            <ProfileHeaderModal
                open={false}
                onClose={jest.fn()}
                avatar={mockImage}
                wallpaper={mockImage}
                onChangeWallpaper={jest.fn()}
                onOpenProfileDescriptionModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });

    it("should render correctly and empty avatar and image", () => {
        const mockUser = mockRootState.user.data;
        const wrapper = mountWithStore(
            <ProfileHeaderModal
                open={true}
                onClose={jest.fn()}
                avatar={undefined}
                wallpaper={undefined}
                onChangeWallpaper={jest.fn()}
                onOpenProfileDescriptionModal={jest.fn()}
            />, mockRootState);

        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Pick a header")).toBe(true);
        expect(wrapper.text().includes("People who visit your profile will see it. Show your style.")).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe("");
        expect(wrapper.find(Avatar).prop("src")).toEqual(DEFAULT_PROFILE_IMG);
        expect(wrapper.text().includes(mockUser!.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser!.username)).toBe(true);
        expect(wrapper.find(Button).text().includes("Skip for now")).toBe(true);
    });

    it("should render correctly avatar and image and click", () => {
        const mockOnOpenProfileDescriptionModal = jest.fn();
        const wrapper = mountWithStore(
            <ProfileHeaderModal
                open={true}
                onClose={jest.fn()}
                avatar={mockImage}
                wallpaper={mockImage}
                onChangeWallpaper={jest.fn()}
                onOpenProfileDescriptionModal={mockOnOpenProfileDescriptionModal}
            />, mockRootState);

        wrapper.find(Button).simulate("click");

        expect(mockOnOpenProfileDescriptionModal).toHaveBeenCalled();
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.find("img").at(0).prop("src")).toBe(mockImage.src);
        expect(wrapper.find(Avatar).prop("src")).toEqual(mockImage.src);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
    });
});
