package org.marouanedbibih.car.modules.client;
import lombok.Builder;

@Builder
public record ClientREQ(
    String name,
    Float age
) {
    
}
