package com.dahlke.reactdemo.config;

import javax.inject.Inject;

import com.dahlke.reactdemo.config.ajax.AjaxAuthenticationSuccessHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import com.dahlke.reactdemo.config.ajax.AjaxAuthenticationFailureHandler;
import com.dahlke.reactdemo.config.ajax.AjaxLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Inject
	private AjaxAuthenticationSuccessHandler authSuccessHandler;

	@Inject
	private AjaxAuthenticationFailureHandler authFailureHandler;

	@Inject
	private AjaxLogoutSuccessHandler logoutSuccessHandler;

	/**
	 * Demo-only users. Replace this with a real authentication config.
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication()
			.withUser("user").password("password").roles("USER").and()
			.withUser("admin").password("admin").roles("USER", "ADMIN");
	}

	/**
	 * Specify the paths that Spring Security will completely ignore. This is distinct
	 * from paths that are available to all users. Static, public resources are ideal
	 * candidates.
	 */
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(
			"/asset-manifest.json",
			"/favicon.ico",
			"/index.html",
			"/service-worker.js",
			"/static/**"
		);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO: remove all the comment stuff once I have all the minesweeper stuff working.
		http
			.csrf().disable()
			.authorizeRequests()
				.antMatchers("/", "/signin", "/api/account", "/api/game", "/api/click", "/api/start").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/signin")
				.loginProcessingUrl("/api/authenticate")
				.successHandler(authSuccessHandler)
				.failureHandler(authFailureHandler)
				.permitAll()
			.and()
				.logout()
				.logoutUrl("/api/signout")
				.logoutSuccessHandler(logoutSuccessHandler)
				.permitAll();
	}

}
