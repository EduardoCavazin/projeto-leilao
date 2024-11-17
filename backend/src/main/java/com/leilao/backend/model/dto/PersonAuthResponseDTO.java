package com.leilao.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor //Equivalente a um construtor com todos os atributos da classe
public class PersonAuthResponseDTO {
    private String email;
    private String token;
}
