package com.example.productsShopping.repository;

import com.example.productsShopping.entity.Product;
import com.example.productsShopping.entity.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            User user = createUser("timur", "mammedov", "timur@example.com", "timur", "timur");

            List<Product> products = Arrays.asList(
                createProduct("Xiaomi", "Xiaomi Redmi Note 12", "Smartphones", "Affordable smartphone with AMOLED display", 249.99, 5, "https://smarton.az/storage/products/50170/smartfon-xiaomi-redmi-note-12-6-128gb-mint-green.webp", user),
                createProduct("Google", "Google Pixel 7", "Smartphones", "Clean Android experience with great camera", 599.99, 5, "https://m.media-amazon.com/images/I/7173p0j-mbL._AC_UF894,1000_QL80_.jpg", user),
                createProduct("Asus", "Asus ROG Zephyrus G14", "Laptops", "Gaming laptop with Ryzen 9", 1599.99, 5, "https://telsat.az//elan_foto/2096/telsat_az_img_61_1678707012.jpg", user),
                createProduct("HP", "HP Spectre x360", "Laptops", "Convertible ultrabook with touchscreen", 1299.99, 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmhdEyxoIp5ePU8WWGyhryRio-L-UPiCKQqQ&s", user),
                createProduct("Razer", "Razer DeathAdder V2", "Gaming Accessories", "Ergonomic gaming mouse", 49.99, 4, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlT1TQNDgZKJeC0cJSG6cA0Ls4TMEl0CyI8Q&s", user),
                createProduct("Logitech", "Logitech G Pro Keyboard", "Gaming Accessories", "Mechanical keyboard for eSports", 129.99, 4, "https://m.media-amazon.com/images/I/51K1mE5uVyL._AC_UF894,1000_QL80_.jpg", user),
                createProduct("TCL", "TCL 55-Inch 4K TV", "Electronics", "Smart TV with Roku built-in", 449.99, 5, "https://pimcdn.sharafdg.com/cdn-cgi/image/width=600,height=600,fit=pad/images/S400901800_1?1743084894", user),
                createProduct("Philips", "Philips Ambilight OLED", "Electronics", "Immersive TV with Ambilight", 1499.99, 5, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB6FY5IZeT-AAymabMI7P05axHexN5mXrYkA&s", user),
                createProduct("JBL", "JBL Tune 760NC", "Audio", "Wireless over-ear noise-cancelling headphones", 129.99, 5, "https://gpro.lt/images/full/9eb62f1fbaf0c4e55ee09a2931a3b588.jpg", user),
                createProduct("Anker", "Anker Soundcore Life Q30", "Audio", "Affordable ANC headphones", 79.99, 4, "https://m.media-amazon.com/images/I/61hLqPDFQjL._AC_UF894,1000_QL80_.jpg", user),
                createProduct("Garmin", "Garmin Forerunner 255", "Wearables", "GPS running smartwatch", 349.99, 5, "https://m.media-amazon.com/images/I/71tjy7Umf0L._AC_UF894,1000_QL80_.jpg", user),
                createProduct("Fitbit", "Fitbit Charge 5", "Wearables", "Fitness tracker with ECG", 179.99, 4, "https://m.media-amazon.com/images/I/51QuFVxlhHL._AC_UF894,1000_QL80_.jpg", user),
                createProduct("Uniqlo", "Uniqlo Airism T-Shirt", "Clothing", "Breathable everyday t-shirt", 14.99, 5, "https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/425974/item/goods_09_425974_3x4.jpg?width=494", user),
                createProduct("Zara", "Zara Slim Fit Blazer", "Clothing", "Stylish slim fit formal blazer", 89.99, 4, "https://static.zara.net/assets/public/c7d3/d251/a1f4457eaebf/d41184da0ad4/09722605800-e1/09722605800-e1.jpg?ts=1730736855095", user),
                createProduct("Adidas", "Adidas Ultraboost 22", "Footwear", "Comfortable and stylish running shoes", 139.99, 5, "https://www.shooos.com/media/catalog/product/cache/2/image/1350x778/9df78eab33525d08d6e5fb8d27136e95/a/d/adidas-ultraboost-22-w-gx55911.jpg", user),
                createProduct("Clarks", "Clarks Desert Boots", "Footwear", "Classic leather desert boots", 119.99, 4, "https://i.ebayimg.com/images/g/x0YAAOSwNnVkuch6/s-l1200.jpg", user),
                createProduct("Herschel", "Herschel Little America Backpack", "Accessories", "Trendy and functional backpack", 99.99, 5, "https://herschel.eu/content/dam/herschel/products/11390/11390-06246-OS_01.jpg", user),
                createProduct("Guess", "Guess Quilted Shoulder Bag", "Accessories", "Fashionable handbag for women", 129.99, 5, "https://img.guess.com/image/upload/b_rgb:FFFFFF,c_limit,dpr_1.5,f_auto,h_532,q_auto,w_400/c_limit,h_532,w_400/v1/NA/Style/ECOMM/QA874812-BLA?pgw=1", user),
                createProduct("Lenovo", "Lenovo Tab P11 Pro", "Tablets", "Premium Android tablet with OLED display", 499.99, 5, "https://p2-ofp.static.pub/fes/cms/2022/08/01/ycumf4z4oia108az0pq0kzvf17wdws486228.png", user),
                createProduct("Realme", "Realme Pad", "Tablets", "Affordable tablet for entertainment", 199.99, 5, "https://www.savenearn.com.ph/cdn/shop/files/realme-pad-x-tablet-realme-save-n-earn-wireless.png?v=1684949277", user)
            );
            

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
        user.setPassword(passwordEncoder.encode(password));
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
