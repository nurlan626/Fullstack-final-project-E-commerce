package com.example.productsShopping.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@AllArgsConstructor
@Table(name = "products")
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Product marka is required")
    private String brand;

    @NotBlank(message = "Product model is required")
    private String model;

    @NotBlank(message = "Product category is required")
    private String category;

    @Column(columnDefinition = "TEXT")
    @NotNull(message = "Description  cannot be null")
    @Size(min = 1, max = 5000, message = "Description must be between 1 and 5000 characters")
    private String description;

    @NotNull(message = "Price cannot be null")
    @DecimalMin(value = "0", message = "Price must be at least 0")
    private double price;

    @NotNull(message = "Rate cannot be null")
    @DecimalMin(value = "0", message = "Rate must be at least 0")
    @DecimalMax(value = "5", message = "Rate must be less than or equal to 5")
    private double rate;

  


    @Column(columnDefinition = "TEXT")
    @NotNull(message = "Image url cannot be null")
    @Size(min = 1, max = 5000, message = "Image url must be between 1 and 5000 characters")
    private String imageUrl;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference 
    private User user;


    public Product(String brand, String model, String category, String description, double price, double rate, String imageUrl) {
        this.brand = brand;
        this.model = model;
        this.category = category;
        this.description = description;
        this.price = price;
        this.rate = rate;
        this.imageUrl = imageUrl;
    }

    public Product(String realme, String realmePad, String tablets, String affordableTabletForEntertainment, double v, int i, String url, User user) {
    }
}