package org.marouanedbibih.client.module;

import org.springframework.stereotype.Component;

@Component
public class ClientMapper {


    // Request to entity
    public Client toEntity(ClientREQ request) {
        return Client.builder()
            .name(request.name())
            .age(request.age())
            .build();
    }

    // Entity to DTO
    public ClientDTO toDTO(Client entity) {
        return ClientDTO.builder()
            .id(entity.getId())
            .name(entity.getName())
            .age(entity.getAge())
            .build();
    }

    
}
