package com.springboot.automobileInsurance.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.automobileInsurance.config.JwtUtil;
import com.springboot.automobileInsurance.dto.TokenDto;
import com.springboot.automobileInsurance.exception.InvalidUsernameException;
import com.springboot.automobileInsurance.model.User;
import com.springboot.automobileInsurance.service.AuthService;
import com.springboot.automobileInsurance.service.MyUserService;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private AuthService authService;
	@Autowired
	private MyUserService myUserService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/api/auth/signup")
	public User signUp(@RequestBody User user) throws InvalidUsernameException {
		
		return authService.signUp(user);
	}
	
	@PostMapping("/api/auth/login")
	public UserDetails login(Principal principal) {
		/* Make this login as Authenticated API 
		 * If this method is called, it means that Spring Filter alreeady
		 * has correct username/password
		 * 
		 * Can i ask spring filter to share these username and password  with me?
		 * -- yes but only username, spring filter never ever shares user password 
		 * */
		String username = principal.getName();
		return myUserService.loadUserByUsername(username);
	}
	
	@GetMapping("/api/auth/hello")
	public String greet()
	{
		return "hello";
	}
	
	@PostMapping("/api/auth/token/generate")
	public TokenDto generateToken(@RequestBody User user,TokenDto dto) {
		/*Step 1. Build authentication ref based on username,passord given*/
		Authentication auth = 
		new UsernamePasswordAuthenticationToken(user.getUsername(),user.getPassword());
	
		authenticationManager.authenticate(auth);
		
		/*Step 2: Generate the token since we know that credentials are correct */
		String token =  jwtUtil.generateToken(user.getUsername()); 
		dto.setToken(token);
		dto.setUsername(user.getUsername());
		dto.setExpiry(jwtUtil.extractExpiration(token).toString());
		return dto; 
	}
	
	@GetMapping("/api/auth/user/details")
	public UserDetails getUserDetails(Principal principal) {
		String username = principal.getName();
		return myUserService.loadUserByUsername(username);
	}
}
