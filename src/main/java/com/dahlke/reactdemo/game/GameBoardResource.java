package com.dahlke.reactdemo.game;

import java.util.List;
import javax.inject.Inject;
import java.net.*;
import javax.servlet.http.HttpServletRequest;

import com.dahlke.reactdemo.utils.Functions;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;


/**
 * Handles fetching game state from Go Minesweeper Service via AJAX.
 */

@RestController
@RequestMapping(value = "/game-api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class GameBoardResource {

	private String server = "localhost";
	private int port = 3000;

	@RequestMapping("/**")
	@ResponseBody
	public String mirrorRest(@RequestBody String body, HttpMethod method, HttpServletRequest request) throws URISyntaxException
	{
		System.out.println(server);
		System.out.println(port);
		System.out.println(request.getRequestURI());
		RestTemplate restTemplate = new RestTemplate();
		URI uri = new URI("http", null, server, port, request.getRequestURI(), request.getQueryString(), null);

		System.out.println(uri);
		ResponseEntity<String> responseEntity =
			restTemplate.exchange(uri, method, new HttpEntity<String>(body), String.class);

		// curl -i -X POST '127.0.0.1:3000/game' -d '{"name": "teste", "rows": 10, "cols": 8, "mines": 20}'
		// curl -i -X POST '127.0.0.1:3001/api/game' -d '{"name": "teste", "rows": 10, "cols": 8, "mines": 20}'

		return responseEntity.getBody();
	}
}
