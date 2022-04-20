package com.nail.backend.common.auth;


import com.nail.backend.domain.user.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 부가 상세정보(활성화 여부, 만료, 롤 등) 정의.
 */
public class JwtUserDetails implements UserDetails, OAuth2User {

	@Autowired
	User user;

	boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<GrantedAuthority> roles = new ArrayList<>();

	private Map<String, Object> attributes;

    public JwtUserDetails(User user) {
    		super();
    		this.user = user;
    }

	public JwtUserDetails(User user, Map<String, Object> attributes) {
		super();
		this.user = user;
		this.attributes = attributes;
	}

    public User getUser() {
    		return this.user;
    }
	@Override
	public String getPassword() {
		return "";
	}
	@Override
	public String getUsername() { return this.user.getUserEmail(); }
	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}
	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialNonExpired;
	}
	@Override
	public boolean isEnabled() {
		return this.enabled;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println(AuthorityUtils.createAuthorityList(user.getUserRole()));
		return AuthorityUtils.createAuthorityList(user.getUserRole());
	}

	public void setAuthorities(List<GrantedAuthority> roles) {
		this.roles = roles;
	}

	@Override
	public String getName() {
		return null;
	}
}
