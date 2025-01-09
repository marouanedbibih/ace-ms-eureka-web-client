package org.marouanedbibih.car.modules.car;

import lombok.Builder;

@Builder
public record CarREQ(
        String marque,
        String matricule,
        String model,
        Long clientId
        ) {

}
