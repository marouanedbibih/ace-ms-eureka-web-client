package org.marouanedbibih.car.config;

import org.marouanedbibih.car.modules.car.Car;
import org.marouanedbibih.car.modules.car.CarRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Random;

@Configuration
public class DatabaseInit {

    @Bean
    CommandLineRunner initializeDatabase(CarRepository carRepository) {
        return args -> {
            // Random generator for clientId
            Random random = new Random();

            // Create and save 30 cars
            List<Car> cars = List.of(
                    Car.builder().marque("Toyota").matricule("123-ABC").model("Corolla").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Honda").matricule("456-DEF").model("Civic").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Ford").matricule("789-GHI").model("Focus").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Chevrolet").matricule("012-JKL").model("Malibu").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("BMW").matricule("345-MNO").model("3 Series").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Mercedes").matricule("678-PQR").model("C-Class").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Audi").matricule("901-STU").model("A4").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Nissan").matricule("234-VWX").model("Altima").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Hyundai").matricule("567-YZA").model("Elantra").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Kia").matricule("890-BCD").model("Optima").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Volkswagen").matricule("123-EFG").model("Passat").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Mazda").matricule("456-HIJ").model("Mazda6").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Subaru").matricule("789-KLM").model("Impreza").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Tesla").matricule("012-NOP").model("Model 3").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Volvo").matricule("345-QRS").model("S60").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Jaguar").matricule("678-TUV").model("XE").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Porsche").matricule("901-WXY").model("911").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Lexus").matricule("234-ZAB").model("ES").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Ferrari").matricule("567-CDE").model("488").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Lamborghini").matricule("890-FGH").model("Huracán").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Rolls Royce").matricule("123-IJK").model("Phantom").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Bentley").matricule("456-LMN").model("Continental").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Aston Martin").matricule("789-OPQ").model("DB11").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Maserati").matricule("012-RST").model("Ghibli").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Land Rover").matricule("345-UVW").model("Range Rover").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Jeep").matricule("678-XYZ").model("Wrangler").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Suzuki").matricule("901-ABC").model("Swift").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Peugeot").matricule("234-DEF").model("3008").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Renault").matricule("567-GHI").model("Clio").clientId((long) (random.nextInt(10) + 1)).build(),
                    Car.builder().marque("Citroen").matricule("890-JKL").model("C4").clientId((long) (random.nextInt(10) + 1)).build()
            );

            carRepository.saveAll(cars);
            System.out.println("Database initialized with 30 cars.");
        };
    }
}
