package com.git.myworkspace.opendata.covid;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Component("CovidController")
@RestController
@RequestMapping(value = "/opendata/covid")
public class CovidController {
	private CovidSidoDailyRepository repo;
	private final String cachName = "covid-current";

	@Autowired
	public CovidController(CovidSidoDailyRepository repo) {
		this.repo = repo;
	}

	@Cacheable(value = cachName, key = "'all'")
	@GetMapping(value = "/sido/current")
	public List<CovidSidoDaily> getCovidSidoCurrent() {

		List<Order> orders = new ArrayList<Order>();
		orders.add(new Order(Sort.Direction.DESC, "createDt"));
		orders.add(new Order(Sort.Direction.ASC, "gubun"));

		return repo.findAll(PageRequest.of(0, 25, Sort.by(orders))).toList();
	}

	@Cacheable(value = cachName, key = "#city")
	@GetMapping(value = "/sido/current/{city}")
	public List<CovidSidoDaily> getCovideSidoCurrent(@PathVariable String city) {
		Pageable page = PageRequest.of(0, 14, Sort.by("createDt").descending());
		return repo.findByGubun(page, city);

	}

}
