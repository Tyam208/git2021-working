package com.git.helloclient;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class HelloClientService {

	@RabbitListener(queues = "test.hello.1")
	public void receiveMassage(String message) {
		System.out.println("— test.hello.1—");
		System.out.println(message);
	}
}
