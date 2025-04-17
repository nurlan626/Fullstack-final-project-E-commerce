1) Create and run database products_shopping 

2) Change configuration in application.properties file
    # MySQL Configuration
    spring.datasource.url=jdbc:mysql://localhost:3306/products_shopping
   
    spring.datasource.username=admin -> write your user
   
    spring.datasource.password=admin -> write your password



3) In WebConfig.java file write your front-end adress
   
    @Configuration
    public class WebConfig {
    
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**") // Разрешить доступ ко всем маршрутам
                            .allowedOrigins("http://127.0.0.1:5500", "http://localhost:5500")// Укажите источник, который может отправлять запросы
                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Разрешённые методы
                            .allowedHeaders("*") // Разрешённые заголовки
                            .allowCredentials(true); // Если нужно передавать куки
                }
            };
        }
    }
    
4) Run spring, then front-end
