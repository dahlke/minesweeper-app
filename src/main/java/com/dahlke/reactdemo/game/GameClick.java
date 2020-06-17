package com.dahlke.reactdemo.game;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Simple data container class. We need a no-args constructor so that Jackson
 * can deserialise these.
 */
@Data
@NoArgsConstructor
public class GameClick {
	private String name;
	private Integer row;
	private Integer col;

	public GameClick(String name, Integer row, Integer col) {
		setName(name);
		setRow(row);
		setCol(col);
	}
} 
