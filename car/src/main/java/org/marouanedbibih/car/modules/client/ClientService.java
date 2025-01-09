package org.marouanedbibih.car.modules.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "client-service")
public interface ClientService {
    @GetMapping("/api/clients")
    List<ClientDTO> getAll();

    @GetMapping("/api/client/{id}")
    ClientDTO findById(@PathVariable("id") Long id);

    @PostMapping("/api/client")
    ClientDTO create(@RequestBody ClientREQ request);

    @PutMapping("/api/client/{id}")
    ClientDTO update(@PathVariable("id") Long id, @RequestBody ClientREQ request);

    @DeleteMapping("/api/client/{id}")
    void delete(@PathVariable("id") Long id);
}
