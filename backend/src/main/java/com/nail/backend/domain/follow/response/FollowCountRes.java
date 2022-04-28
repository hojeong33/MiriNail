package com.nail.backend.domain.follow.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowCountRes {
    private long followFollowee;
    private long count;
}
