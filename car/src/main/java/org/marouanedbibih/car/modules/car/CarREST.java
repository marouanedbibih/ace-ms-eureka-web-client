package org.marouanedbibih.car.modules.car;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CarREST {

    private final CarService service;

    // Get all cars
    @GetMapping("/api/cars")
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.ok(service.getAll());
    }

    // Get a single car by ID
    @GetMapping("/api/car/{id}")
    public ResponseEntity<CarDTO> getCar(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    // Create a new car
    @PostMapping("/api/car")
    public ResponseEntity<CarDTO> createCar(@RequestBody CarREQ request) {
        return ResponseEntity.ok(service.create(request));
    }

    // Update a car
    @PutMapping("/api/car/{id}")
    public ResponseEntity<CarDTO> updateCar(@PathVariable Long id, @RequestBody CarREQ request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    // Delete a car
    @DeleteMapping("/api/car/{id}")
    public ResponseEntity<Response> deleteCar(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
