//package com.nail.backend.common.auth;
//
//import com.nail.backend.common.util.CookieUtil;
//import com.nail.backend.common.util.JwtTokenUtil;
//import com.nail.backend.common.util.RedisUtil;
//import com.nail.backend.domain.user.db.entity.User;
//import com.nail.backend.domain.user.service.LogService;
//import io.jsonwebtoken.ExpiredJwtException;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.Cookie;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
///**
// * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
// */
//@Slf4j
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    @Autowired
//	private LogService logService;
//
//    @Autowired
//    private CookieUtil cookieUtil;
//
//    @Autowired
//    private RedisUtil redisUtil;
//
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//
//        final Cookie accessCookie = cookieUtil.getCookie(request, jwtTokenUtil.ACCESS_TOKEN_NAME);
//
//        String userEmail = null;
//        String accessToken = null;
//        String refreshToken = null;
//
//        try{
//            if(accessCookie != null){
//                accessToken = accessCookie.getValue();
//
//                userEmail = jwtTokenUtil.getUserEmail(accessToken);
//            }
//            if(userEmail != null){    // Access token이 유효하면 AccessToken내 payload를 읽어 사용자와 관련있는 userDetail 생성
//                log.info("jwt - access token 유효");
//                // jwt 토큰에 포함된 계정 정보(userEmail) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
//                User user = logService.getUserDetailByEmail(userEmail);
//
//                JwtUserDetails jwtUserDetails = new JwtUserDetails(user);
//                if(jwtTokenUtil.verify(accessToken).isResult()){
//                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
//                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getUserSeq(),
//                            null, AuthorityUtils.createAuthorityList(user.getUserRole()));
//                    jwtAuthentication.setDetails(jwtUserDetails);
//                    // jwt 토큰으로 부터 획득한 인증 정보(authentication) 설정.
//                    SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
//                }
//            }
//        }catch (ExpiredJwtException e){ // Access token이 유효하지 않으면 Refresh Token 값을 읽어드림
//            log.info("jwt - access token 유효하지 않아서 refresh token 값 가져오기");
//            Cookie refreshCookie = cookieUtil.getCookie(request,jwtTokenUtil.REFRESH_TOKEN_NAME);
//            if(refreshToken!=null){
//                refreshToken = refreshCookie.getValue();
//            }
//        }catch(Exception e){
//        }
//
//        try{    // Refresh Token을 읽어 Access Token을 사용자에게 재생성하고, 요청을 허가시킴
//            if(refreshToken != null){
//                userEmail = redisUtil.getData(refreshToken);
//                if (userEmail != null) {
//                    log.info("jwt - access token 읽어오기 성공");
//                    User user = logService.getUserDetailByEmail(userEmail);
//                    JwtUserDetails jwtUserDetails = new JwtUserDetails(user);
//
//                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(user.getUserSeq(),
//                            null, AuthorityUtils.createAuthorityList(user.getUserRole()));
//                    jwtAuthentication.setDetails(jwtUserDetails);
//
//                    SecurityContextHolder.getContext().setAuthentication(jwtAuthentication);
//
//                    // Access Token 재생성
//                    String newToken = jwtTokenUtil.createAccessToken(user.getUserSeq(), userEmail);
//
//                    Cookie newAccessToken = cookieUtil.createCookie(jwtTokenUtil.ACCESS_TOKEN_NAME, newToken);
//                    response.addCookie(newAccessToken);
//                }
//            }
//        }catch(ExpiredJwtException e){
//
//        }
//        filterChain.doFilter(request,response);
//    }
//}
