package com.example.productsShopping.repository;

import com.example.productsShopping.entity.Product;
import com.example.productsShopping.entity.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        // Проверяем, есть ли данные в таблице Products
        if (productRepository.count() == 0) {
            User user = createUser("timur", "mammedov", "timur@example.com", "timur", "timur");

            // Создаем список продуктов
            List<Product> products = Arrays.asList(
                    createProduct("Samsung", "Samsung Galaxy S21", "Smartphones", "Latest Samsung Galaxy smartphone", 799.99, 5, "https://i5.walmartimages.com/seo/Samsung-Galaxy-S21-Plus-5G-128-256GB-SM-G996U1-US-Model-Unlocked-Cell-Phones-Very-Good-Condition_46af8b5d-3a63-46e8-97d7-3a8f9fa35f00.4243b2ff1db36d328a46f09ad220d988.jpeg", user),
                    createProduct("Apple", "Apple iPhone 13", "Smartphones", "Newest Apple iPhone model", 999.99, 5, "https://smarton.az/storage/products/47096/210927160010235057.webp", user),
                    createProduct("Apple", "Apple MacBook Pro", "Laptops", "Powerful Apple laptop", 1299.99, 5, "https://irshad.az/cdn-cgi/image/width=540,height=550/storage/products/77782/mnej3rusasassasas.jpg", user),
                    createProduct("Dell", "Dell XPS 13", "Laptops", "High-performance Dell laptop", 1199.99, 5, "https://m.media-amazon.com/images/I/710EGJBdIML._AC_SL1500_.jpg", user),
                    createProduct("Microsoft", "Microsoft Xbox Controller", "Gaming Accessories", "Ergonomic Xbox game controller", 59.99, 4, "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4MeI4?ver=d9bf", user),
                    createProduct("Sony", "Sony PS5 Controller", "Gaming Accessories", "Sony DualSense wireless controller", 69.99, 4, "https://gmedia.playstation.com/is/image/SIEPDC/dualsense-controller-product-thumbnail-01-en-14sep21?$facebook$", user),
                    createProduct("Samsung", "Samsung QLED TV", "Electronics", "4K UHD Smart TV", 1499.99, 5, "https://images.samsung.com/is/image/samsung/p6pim/my/qa65q70dakxxm/gallery/my-qled-tv-qa65q70dakxxm-front-gray-540854235?$650_519_PNG$", user),
                    createProduct("LG", "LG OLED TV", "Electronics", "Premium OLED TV with AI", 1999.99, 5, "https://smarton.az/storage/products/50243/newproject-51.png", user),
                    createProduct("Sony", "Sony WH-1000XM5", "Audio", "Noise-cancelling wireless headphones", 349.99, 5, "https://kontakt.az/media/catalog/product/cache/a404967cc40694dc557cd869288440a4/6/1/61bp0d2-0al._ac_sl1500__2_.png", user),
                    createProduct("Bose", "Bose QC45", "Audio", "Premium noise-cancelling headphones", 329.99, 5, "https://bytelecom.az//media/2023/02/14/product_images/16796/017817835022-1.jpg", user),
                    createProduct("Apple", "Apple Watch Series 7", "Wearables", "Smartwatch with health features", 399.99, 5, "https://maxi.az/upload/iblock/91e/4la8kyx8ahv9evvwvd3ft110mveakjgj/a_ll_saat_apple_watch_series_7_45mm_midnight_aluminum_case_with_sport_band_detail.jpg", user),
                    createProduct("Samsung", "Samsung Galaxy Watch 4", "Wearables", "Smartwatch with fitness tracking", 299.99, 5, "https://amazoncomp.az/wp-content/uploads/2021/12/188077-28c4f00eec403166cf349f8366cab1d9.jpg", user),
                    createProduct("Hanes", "Hanes Cotton T-Shirt", "Clothing", "Comfortable cotton t-shirt", 19.99, 5, "https://m.media-amazon.com/images/I/51gKzl-UuWL._AC_UY1000_.jpg", user),
                    createProduct("Calvin Klein", "Calvin Klein Formal Shirt", "Clothing", "Elegant formal shirt", 39.99, 4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkJD32AE39wM6dxIPVUk9iuA--wLQA5lIpvg&s", user),
                    createProduct("Nike", "Nike Running Shoes", "Footwear", "Lightweight running shoes", 89.99, 5, "https://www.nike.sa/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwebce1bf5/nk/943/4/1/3/1/1/94341311_2775_4950_ba7e_83c397a73349.jpg?sw=700&sh=700&sm=fit&q=100&strip=false", user),
                    createProduct("Timberland", "Timberland Leather Boots", "Footwear", "Stylish leather boots", 149.99, 4, "https://assets.timberland.eu/images/t_img/f_auto,h_650,w_650/e_sharpen:60/dpr_2.0/v1725458677/TB127097214-HERO/Timberland-Premium-6Inch-LaceUp-Waterproof-Boot-for-Men-in-Dark-Brown.png", user),
                    createProduct("Samsonite", "Samsonite Backpack", "Accessories", "Durable and spacious backpack", 79.99, 5, "https://shop.samsonite.com/dw/image/v2/BBZB_PRD/on/demandware.static/-/Sites-product-catalog/default/dwdaea9ec7/collections/_samsonite/elevation-plus-softside/500x500/147935-1549-FRONT34.jpg?sw=912&sh=912", user),
                    createProduct("Michael Kors", "Michael Kors Handbag", "Accessories", "Elegant leather handbag", 199.99, 5, "https://cdn-images.farfetch-contents.com/13/20/16/04/13201604_54422838_600.jpg", user),
                    createProduct("Apple", "Apple iPad Pro", "Tablets", "Powerful Apple tablet", 899.99, 5, "https://amazoncomp.az/wp-content/uploads/2020/08/81SGb5llZL._AC_SL1500_.jpg", user),
                    createProduct("Samsung", "Samsung Galaxy Tab S7", "Tablets", "High-performance Android tablet", 699.99, 5, "https://kontakt.az/media/catalog/product/cache/73991a74402c6725bb0d51edfe2de5b7/n/e/new_project_-_2022-03-02t165208.675.png", user)
            );

            // Сохраняем все продукты в базе данных
            productRepository.saveAll(products);

            System.out.println("База данных успешно заполнена начальными данными.");
        } else {
            System.out.println("База данных уже содержит данные. Инициализация пропущена.");
        }
    }

    private User createUser(String name, String surname, String email, String username, String password) {
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
        return user;
    }

    private Product createProduct(String brand, String model, String category, String description, double price, int rate, String imageUrl, User user) {
        Product product = new Product();
        product.setBrand(brand);
        product.setModel(model);
        product.setCategory(category);
        product.setDescription(description);
        product.setPrice(price);
        product.setRate(rate);
        product.setImageUrl(imageUrl);
        product.setUser(user);
        return product;
    }
}
