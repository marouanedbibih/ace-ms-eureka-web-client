package org.marouanedbibih.client.module;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository repository;
    private final ClientMapper mapper;


    // Service to create a new client
    public ClientDTO create(ClientREQ request) {
        Client entity = mapper.toEntity(request);
        entity = repository.save(entity);
        return mapper.toDTO(entity);
    }

    // Service to get a client by id
    public ClientDTO get(Long id) {
        Client entity = repository.findById(id).orElseThrow();
        return mapper.toDTO(entity);
    }

    // Service to update a client
    public ClientDTO update(Long id, ClientREQ request) {
        Client entity = repository.findById(id).orElseThrow();
        entity.setName(request.name());
        entity.setAge(request.age());
        entity = repository.save(entity);
        return mapper.toDTO(entity);
    }

    // Service to delete a client
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // Service to get all clients
    public List<ClientDTO> getAll() {
        List<Client> entities = repository.findAll();
        return entities.stream()
            .map(mapper::toDTO)
            .collect(Collectors.toList());
    }
    
}
