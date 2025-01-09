package org.marouanedbibih.car.modules.car;

import org.springframework.stereotype.Component;

@Component
public class CarMapper {

    public Car toEntity(CarREQ req) {
        return Car.builder()
                .marque(req.marque())
                .matricule(req.matricule())
                .model(req.model())
                .build();
    }

    public CarDTO toDTO(Car entity) {
        return CarDTO.builder()
                .id(entity.getId())
                .marque(entity.getMarque())
                .matricule(entity.getMatricule())
                .model(entity.getModel())
                .client(null)
                .build();
    }

}
