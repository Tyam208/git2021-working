package com.git.helloclient;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
public class HelloClientController {

	@GetMapping(value = "/event")
	public SseEmitter connectEvent() {
		SseEmitter emitter = new SseEmitter();

		return emitter;
	}
}
