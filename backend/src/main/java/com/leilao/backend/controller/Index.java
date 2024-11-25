package com.leilao.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/index")
public class Index {

    @GetMapping
    public String index() {
        return "Olá Amiguinho";
    }

    @GetMapping("/new")
    public String index2() {
        return "Olá Amiguinho 2";
    }

    @PostMapping
    public String save() {
        return "Salvo";
    }
}
