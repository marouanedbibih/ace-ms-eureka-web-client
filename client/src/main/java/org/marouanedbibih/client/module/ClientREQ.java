package org.marouanedbibih.client.module;

import lombok.Builder;

@Builder
public record ClientREQ(
    String name,
    Float age
) {
    
}
