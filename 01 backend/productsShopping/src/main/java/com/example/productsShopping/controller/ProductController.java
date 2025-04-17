package com.example.productsShopping.controller;


import com.example.productsShopping.dto.ProductDto;
import com.example.productsShopping.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping
    public ResponseEntity<ProductDto> addProduct(
            Principal principal,
            @Valid @RequestBody ProductDto productDto
    ) {

        return ResponseEntity.ok(productService.addProduct(principal.getName(), productDto));
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getUserProducts(Principal principal) {
        return ResponseEntity.ok(productService.getUserProducts(principal.getName()));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(
            Principal principal,
            @PathVariable Long productId
    ) {
        productService.deleteProduct(principal.getName(), productId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{productId}")
    public ResponseEntity<ProductDto> updateProduct(
            Principal principal,
            @PathVariable Long productId,
                @Valid @RequestBody ProductDto productDto
    ) {
        return ResponseEntity.ok(productService.updateProduct(principal.getName(), productId, productDto));
    }
}