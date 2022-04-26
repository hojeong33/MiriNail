package com.nail.backend.domain.follow.db.entity;

import com.nail.backend.domain.user.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;

@Getter
@Entity
@ApiModel(value = "Follow", description = "팔로우 정보")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@ToString
public class Follow {

    @ApiModelProperty(value = "팔로우 Seq")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
<<<<<<< HEAD
    // 회원 id
=======
    // 팔로우 Seq
>>>>>>> 88e46623a78a4336ce4fd2d8c26793db9310f8f8
    Long followSeq;

    @ManyToOne
    @JoinColumn(name = "follow_follower", referencedColumnName = "user_seq")
    @ApiModelProperty(value = "팔로우 요청하는 사람 Seq")
    User followFollower;

    @ManyToOne
    @JoinColumn(name = "follow_followee", referencedColumnName = "user_seq")
    @ApiModelProperty(value = "팔로우 요청받는 사람 Seq")
    User followFollowee;

}
