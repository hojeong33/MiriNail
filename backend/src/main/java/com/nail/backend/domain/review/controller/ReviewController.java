package com.nail.backend.domain.review.controller;

import com.nail.backend.domain.review.service.ReviewService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Api(value = "리뷰 Api")
@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

//    CREATE_________________________________________


//    READ___________________________________________
//    UPDATE_________________________________________

//    DELETE_________________________________________

}
