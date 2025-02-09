import React from "react";

import {mountWithStore} from "../../../../util/testHelper";
import ActionIcon from "../ActionIcon";
import {MESSAGES} from "../../../../util/pathConstants";
import {DetailsIcon} from "../../../../icons";
import ActionIconButton from "../../../../components/ActionIconButton/ActionIconButton";

describe("ActionIcon", () => {

    it("should render ActionIcon", () => {
        const wrapper = mountWithStore(<ActionIcon actionText={"Details"} className={"icon"} icon={DetailsIcon}/>);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Details");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(DetailsIcon);
    });

    it("should render ActionIcon with link", () => {
        const wrapper = mountWithStore(<ActionIcon path={MESSAGES} actionText={"Details"} className={"icon"} icon={DetailsIcon}/>);
        expect(wrapper.find(ActionIconButton).prop("actionText")).toBe("Details");
        expect(wrapper.find(ActionIconButton).prop("icon")).toBe(DetailsIcon);
    });
});
