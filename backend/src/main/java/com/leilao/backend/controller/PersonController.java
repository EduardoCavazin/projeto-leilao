package com.leilao.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.leilao.backend.model.Profile;
import com.leilao.backend.service.ProfileService;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/person")
public class PersonController {

    @Autowired
    private ProfileService profileService;

    @PostMapping
    public Profile create(@RequestBody Profile profile) {
        return profileService.create(profile);
    }

    @PutMapping
    public Profile update(@RequestBody Profile profile) {
        return profileService.update(profile);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        profileService.delete(id);
    }

}
