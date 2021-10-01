package com.git.myworkspace.todo;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//@Controller
//@ResponseBody
@RestController
public class TodoController {

	private SortedMap<Long, Todo> todos = Collections
			.synchronizedSortedMap(new TreeMap<Long, Todo>(Collections.reverseOrder()));

	private AtomicLong maxId = new AtomicLong();

	@GetMapping(value = "/todos")
	public List<Todo> getTodos() {
		// ¸Ê °ª¸ñ·Ï
		return new ArrayList<Todo>(todos.values());
	}

	@PostMapping(value = "/todos")
	public Todo addTodo(@RequestBody Todo todo, HttpServletResponse res) {
		System.out.println(todo);

		if (todo.getMemo() == null || todo.getMemo().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		String memo = getPlainText(todo.getMemo());
		if (memo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		Long currentId = maxId.incrementAndGet();

		Todo todoItem = Todo.builder().id(currentId).memo(memo)
//								.memo(todo.getMemo())
				.createdTime(new Date().getTime()).build();

		todos.put(currentId, todoItem);

		res.setStatus(HttpServletResponse.SC_CREATED);

		System.out.println(todoItem);

		return todoItem;
	}

	@DeleteMapping(value = "/todos/{id}")
	public boolean removeTodo(@PathVariable long id, HttpServletResponse res) {

		Todo todo = todos.get(Long.valueOf(id));

		if (todo == null) {

			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return false;
		}

		todos.remove(Long.valueOf(id));

		return true;
	}

	@PutMapping(value = "/todos/{id}")
	public Todo modifyTodo(@PathVariable long id, @RequestBody Todo todo, HttpServletResponse res) {

		Todo findItem = todos.get(Long.valueOf(id));

		if (findItem == null) {

			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return null;
		}

		if (todo.getMemo() == null || todo.getMemo().isEmpty()) {

			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		String memo = getPlainText(todo.getMemo());
		if (memo.isEmpty()) {
			res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

		findItem.setMemo(memo);

		return findItem;
	}

	private String getPlainText(String text) {
		return text.replaceAll("<(/)?([a-zA-Z]*)(\\s[a-zA-Z]*=[^>]*)?(\\s)*(/)?>", "");
	}
}
