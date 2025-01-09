// package org.marouanedbibih.gateway.config;


// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;
// import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @Configuration
// public class CorsConfig {

//     // @Value("${cors.allowed-origins}")
//     // private String allowedOrigins;

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRegistry registry) {
//                 // Split allowedOrigins by comma and trim whitespace
//                 // String[] origins = allowedOrigins.split(",");

//                 registry.addMapping("/**")
//                         .allowedOrigins("http://localhost:5173") 
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*")
//                         .allowCredentials(true);
//             }
//         };
//     }
// }
