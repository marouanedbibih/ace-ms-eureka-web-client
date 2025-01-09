package org.marouanedbibih.client.config;

import java.util.List;

import org.marouanedbibih.client.module.Client;
import org.marouanedbibih.client.module.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseInit {

    @Bean
    CommandLineRunner initializeDatabase(ClientRepository clientRepository) {
        return args -> {
            // Create and save 10 clients
            List<Client> clients = List.of(
                    Client.builder().name("John Doe").age(25.5f).build(),
                    Client.builder().name("Jane Smith").age(30.0f).build(),
                    Client.builder().name("Alice Johnson").age(22.3f).build(),
                    Client.builder().name("Bob Brown").age(40.8f).build(),
                    Client.builder().name("Charlie Davis").age(35.2f).build(),
                    Client.builder().name("Diana Evans").age(28.4f).build(),
                    Client.builder().name("Frank Green").age(33.7f).build(),
                    Client.builder().name("Grace Hill").age(27.9f).build(),
                    Client.builder().name("Hank Lewis").age(45.1f).build(),
                    Client.builder().name("Ivy Moore").age(29.6f).build());

            clientRepository.saveAll(clients);
            System.out.println("Database initialized with 10 clients.");
        };
    }
}