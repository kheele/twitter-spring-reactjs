package com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.enums.ReplyType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetAdditionalInfoResponse {
    private String text;
    private ReplyType replyType;
    private Long addressedTweetId;
    private UserInfoResponse user;

    @Getter
    @Setter
    static class UserInfoResponse {
        private Long id;
        private String fullName;
        private String username;

        @JsonProperty("isFollower")
        private boolean isFollower;

        @JsonProperty("isMyProfileBlocked")
        private boolean isMyProfileBlocked;

        @JsonProperty("isUserBlocked")
        private boolean isUserBlocked;

        @JsonProperty("isUserMuted")
        private boolean isUserMuted;
    }
}
