package com.git.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.git.controller.contact.Contact;
import com.git.controller.contact.ContactController;

@SpringBootTest
public class TestContactController {

	@Autowired
	ContactController controller;

	@Test
	void addContact() {
		Contact expected = Contact.builder().memo("test").build();

		controller.addContact(expected, null);

	}
}
