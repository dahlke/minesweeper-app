package com.dahlke.reactdemo.game;

import java.util.List;
import javax.inject.Inject;
import java.net.*;
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

	// TODO: update all the other methods to take JSOn instead.
	@RequestMapping(path = "/game", method = POST, consumes = "application/json", produces = "application/json")
	@ResponseBody
	public String game(@RequestBody GameBoard gameBoard) throws IOException {
		// curl -i -H 'Content-Type: application/json' -X POST '127.0.0.1:8080/api/game' -d '{"name": "testeeeed", "rows": 10, "cols": 8, "mines": 20}'

		RestTemplate restTemplate = new RestTemplate();
		String createGameUrl = "http://localhost:3000/game";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(APPLICATION_JSON);

		JSONObject createGameJson = new JSONObject();
		createGameJson.put("name", gameBoard.getName());
		createGameJson.put("rows", gameBoard.getRows());
		createGameJson.put("cols", gameBoard.getCols());
		createGameJson.put("mines", gameBoard.getMines());

		HttpEntity<String> createGameRequest = new HttpEntity<String>(createGameJson.toString(), headers);
		restTemplate.postForObject(createGameUrl, createGameRequest, String.class);

		String startGameUrl = String.format("http://localhost:3000/game/%s/start", gameBoard.getName());
		HttpEntity<String> startGameRequest = new HttpEntity<String>(null, headers);
		String gameBoardAsString = restTemplate.postForObject(startGameUrl, startGameRequest, String.class);
		JsonNode root = objectMapper.readTree(gameBoardAsString);
		JsonNode result = root.path("result");

		return result.toString();
	}

	@RequestMapping(path = "/click", method = POST)
	@ResponseBody
	//consumes = "application/json", produces = "application/json"
	public String game(
		@RequestParam(name="name") String name,
		@RequestParam(name="x") Integer x,
		@RequestParam(name="y") Integer y
	) throws IOException {
		// curl -i -X POST '127.0.0.1:8080/api/click' -d name=test -d x=10 -d y=10

		RestTemplate restTemplate = new RestTemplate();
		String gameUrl = String.format("http://localhost:3000/game/%s/click", name);
		System.out.println(gameUrl);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(APPLICATION_JSON);

		JSONObject gameRequestJson = new JSONObject();
		gameRequestJson.put("col", x);
		gameRequestJson.put("row", y);


		System.out.println(gameUrl);
		HttpEntity<String> request = new HttpEntity<String>(gameRequestJson.toString(), headers);
		String gameBoardAsString = restTemplate.postForObject(gameUrl, request, String.class);
		JsonNode root = objectMapper.readTree(gameBoardAsString);
		JsonNode result = root.path("result");
		return result.toString();
	}

}
