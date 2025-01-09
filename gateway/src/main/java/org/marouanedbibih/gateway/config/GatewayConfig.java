
package org.marouanedbibih.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("clients_routes", r -> r.path("/api/clients/**").uri("lb://CLIENT-SERVICE"))
                .route("client_routes", r -> r.path("/api/client/**").uri("lb://CLIENT-SERVICE"))
                .route("cars_routes", r -> r.path("/api/cars/**").uri("lb://CAR-SERVICE"))
                .route("car_routes", r -> r.path("/api/car/**").uri("lb://CAR-SERVICE"))
                .build();
    }

}