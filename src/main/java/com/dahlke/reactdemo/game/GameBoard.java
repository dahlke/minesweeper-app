package com.dahlke.reactdemo.game;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Simple data container class. We need a no-args constructor so that Jackson
 * can deserialise these.
 */
@Data
@NoArgsConstructor
public class GameBoard {
	private String name;
	private Integer rows;
	private Integer cols;
	private Integer mines;

	public GameBoard(String name, Integer rows, Integer cols, Integer mines) {
		setName(name);
		setRows(rows);
		setCols(cols);
		setMines(mines);
	}
} 
