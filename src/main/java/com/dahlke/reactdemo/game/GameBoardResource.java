package com.dahlke.reactdemo.game;

import java.util.List;
import javax.inject.Inject;
import java.net.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import org.json.JSONObject;
// TODO: clean the imports
import com.dahlke.reactdemo.utils.Functions;
import lombok.extern.slf4j.Slf4j;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;



/**
 * Handles fetching game state from Go Minesweeper Service via AJAX.
 */

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class GameBoardResource {

	private String server = "localhost";
	private int port = 3000;
	private final ObjectMapper objectMapper = new ObjectMapper();

	@RequestMapping(path = "/game", method = POST)
	@ResponseBody
	//consumes = "application/json", produces = "application/json"
	public String game(
		@RequestParam(name="name", defaultValue="test", required=false) String name,
		@RequestParam(name="rows", defaultValue="10", required=false) Integer rows,
		@RequestParam(name="cols", defaultValue="10", required=false) Integer cols,
		@RequestParam(name="mines", defaultValue="20", required=false) Integer mines
	) throws IOException {
		RestTemplate restTemplate = new RestTemplate();
		String gameUrl = "http://localhost:3000/game";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(APPLICATION_JSON);

		JSONObject gameRequestJson = new JSONObject();
		gameRequestJson.put("name", name);
		gameRequestJson.put("rows", rows);
		gameRequestJson.put("cols", cols);
		gameRequestJson.put("mines", mines);

		// curl -i -X POST '127.0.0.1:8080/api/game' -d '{"name": "teste", "rows": 10, "cols": 8, "mines": 20}'
		// curl -i -X POST '127.0.0.1:8080/api/game' -d name=test -d rows=10 -d cols=10 -d mines=20

		System.out.println(gameRequestJson.toString());
		HttpEntity<String> request = new HttpEntity<String>(gameRequestJson.toString(), headers);
		String gameBoardAsString = restTemplate.postForObject(gameUrl, request, String.class);
		JsonNode root = objectMapper.readTree(gameBoardAsString);
		JsonNode result = root.path("result");
		return result.toString();
	}

}
