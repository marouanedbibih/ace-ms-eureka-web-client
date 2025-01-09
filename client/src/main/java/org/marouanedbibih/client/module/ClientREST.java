package org.marouanedbibih.client.module;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ClientREST {

    private final ClientService service;

    @GetMapping("/api/clients")
    public ResponseEntity<List<ClientDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/api/client/{id}")
    public ResponseEntity<ClientDTO> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @PostMapping("/api/client")
    public ResponseEntity<ClientDTO> create(@RequestBody ClientREQ request) {
        return ResponseEntity.ok(service.create(request));
    }

    @PutMapping("/api/client/{id}")
    public ResponseEntity<ClientDTO> update(@PathVariable Long id, @RequestBody ClientREQ request) {
        return ResponseEntity.ok(service.update(id, request));
    }

    @DeleteMapping("/api/client/{id}")
    public ResponseEntity<Response> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
    
}
