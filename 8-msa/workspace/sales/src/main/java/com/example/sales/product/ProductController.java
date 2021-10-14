package com.example.sales.product;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.sales.Result;

@RestController
public class ProductController {
	private ProductService service;

	public ProductController(ProductService service) {
		this.service = service;
	}

	@PostMapping(value = "/products")
	public ProductCreateResponse addProduct(@RequestBody ProductCreateRequest productRequest) {

		Product product = Product.builder().id(1).name(productRequest.getName()).code("P0001")
				.unitPrice(productRequest.getUnitPrice()).build();

		service.sendProduct(product);

		return ProductCreateResponse.builder().product(product).result(new Result("00", "정상적으로 생성")).build();
	}
}
