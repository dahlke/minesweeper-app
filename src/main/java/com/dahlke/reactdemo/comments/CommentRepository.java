package com.dahlke.reactdemo.comments;

public interface CommentRepository {

	Iterable<Comment> findAll();

	Comment save(Comment comment);

	Comment find(Long id);
}

// curl -i -X POST '127.0.0.1:3000/game' -d '{"name": "teste", "rows": 10, "cols": 8, "mines": 20}'
// curl -i -X POST '127.0.0.1:3000/game/teste/start'
// curl -i -X POST '127.0.0.1:3000/game/teste/click' -d '{"row": 1,"col":1}'