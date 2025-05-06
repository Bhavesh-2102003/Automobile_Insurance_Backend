package com.springboot.automobileInsurance.config;

 
import java.util.Arrays;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.springboot.automobileInsurance.service.MyUserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private MyUserService myUserService;
	
	@Autowired
	private JwtFilter jwtFilter;
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.cors(withDefaults())
		.csrf(csrf->csrf.disable())
		
			.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers("/api/auth/token/generate").permitAll()	
				.requestMatchers("/api/auth/user/details").authenticated()
				.requestMatchers("/api/auth/signup").permitAll()
				.requestMatchers("/api/auth/login").permitAll()
				.requestMatchers("/api/auth/hello").authenticated()
				.requestMatchers("/api/officer/add").authenticated()
				.requestMatchers("/api/officer/username/{username}").authenticated()
				.requestMatchers("/api/officer/getByuser/{uId}").authenticated()
				.requestMatchers("/api/officer/profile/{id}").hasAnyAuthority("OFFICER")
				.requestMatchers("/api/officer/profile").authenticated()
				.requestMatchers("/api/policy-template/add").authenticated()
				.requestMatchers("/api/policy-template/delete/{id}").authenticated()
				.requestMatchers("/api/policy-template/update/{id}").authenticated()
				.requestMatchers("/api/policypricing/owndamage").hasAuthority("OFFICER")
				.requestMatchers("/api/policypricing/thirdparty").hasAuthority("OFFICER")
				.requestMatchers("/api/policypricing/comprehensive").hasAuthority("OFFICER")
				.requestMatchers("/api/claim/all").authenticated()  // need to pass the token in authorization
				.requestMatchers("/api/vehicle/add").permitAll()
				.requestMatchers("/swagger-ui/**").permitAll()
				.anyRequest().permitAll()
			)
			.sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
		;
		return http.build();
	}
	
	@Bean
	UrlBasedCorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
	    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    configuration.setAllowedHeaders(Arrays.asList("*")); // Allow all headers
	    configuration.setAllowCredentials(true);             // Important for cookies and Authorization header

	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}

	
	@Bean
	AuthenticationProvider getAuth() {
		DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
		dao.setPasswordEncoder(passEncoder());
		dao.setUserDetailsService(myUserService);	
		return dao;
	}
	
	@Bean
	BCryptPasswordEncoder passEncoder(){
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	AuthenticationManager getAuthManager(AuthenticationConfiguration auth) throws Exception {
		  return auth.getAuthenticationManager();
	 }
	//RBAC
}
