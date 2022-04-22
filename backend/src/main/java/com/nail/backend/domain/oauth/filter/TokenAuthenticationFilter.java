package com.nail.backend.domain.oauth.filter;

import com.nail.backend.common.util.HeaderUtil;
import com.nail.backend.domain.oauth.token.AuthToken;
import com.nail.backend.domain.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    // 토큰 유효성 검사
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)  throws ServletException, IOException {

        // 토큰 값 받아옴
        String tokenStr = HeaderUtil.getAccessToken(request);

        // 인증 토큰으로 변환
        AuthToken token = tokenProvider.convertAuthToken(tokenStr);

        log.info("jwt - 인증토큰 변환");
        if (token.validate()) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}

